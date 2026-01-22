using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ArchiPortfolio.Application.DTOs;
using ArchiPortfolio.Application.Interfaces.Repositories;
using ArchiPortfolio.Application.Interfaces.Services;
using ArchiPortfolio.Application.Utilities;
using ArchiPortfolio.Domain.Entities;

namespace ArchiPortfolio.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IGenericRepository<User> _userRepository;
        private readonly IGenericRepository<RefreshToken> _tokenRepository;
        private readonly IConfiguration _configuration;

        public AuthService(
            IGenericRepository<User> userRepository, 
            IGenericRepository<RefreshToken> tokenRepository, 
            IConfiguration configuration)
        {
            _userRepository = userRepository;
            _tokenRepository = tokenRepository;
            _configuration = configuration;
        }

        public async Task<User> RegisterAdminAsync(LoginDto loginDto)
        {
            // Şifreyi tuzla ve hashle
            HashingHelper.CreatePasswordHash(loginDto.Password, out byte[] passwordHash, out byte[] passwordSalt);

            var user = new User
            {
                Username = loginDto.Username,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                Role = "Admin"
            };

            await _userRepository.AddAsync(user);
            await _userRepository.SaveChangesAsync();
            return user;
        }

        public async Task<TokenDto> LoginAsync(LoginDto loginDto)
        {
            // 1. Kullanıcıyı bul
            var users = await _userRepository.GetAllAsync();
            var user = users.FirstOrDefault(u => u.Username == loginDto.Username);

            if (user == null) return null; // Kullanıcı yok

            // 2. Şifre Doğrulama
            if (!HashingHelper.VerifyPasswordHash(loginDto.Password, user.PasswordHash, user.PasswordSalt))
                return null; // Şifre yanlış

            // 3. Token Üret
            return await CreateTokenDtoAsync(user);
        }

        public async Task<TokenDto> RefreshTokenAsync(string token)
        {
            // Veritabanında bu refresh token var mı?
            var tokens = await _tokenRepository.GetAllAsync();
            var storedToken = tokens.FirstOrDefault(t => t.Token == token);

            // Token yoksa, süresi dolmuşsa veya iptal edilmişse hata dön
            if (storedToken == null || !storedToken.IsActive)
                return null;

            // Eski token'ı iptal et (Revoke)
            storedToken.Revoked = DateTime.UtcNow;
            _tokenRepository.Update(storedToken);
            await _tokenRepository.SaveChangesAsync();

            // Kullanıcıyı bul ve yeni token üret
            var user = await _userRepository.GetByIdAsync(storedToken.UserId);
            return await CreateTokenDtoAsync(user);
        }

        // --- YARDIMCI METOTLAR ---

        private async Task<TokenDto> CreateTokenDtoAsync(User user)
        {
            var accessToken = CreateAccessToken(user);
            var refreshToken = CreateRefreshToken(user);

            // Refresh Token'ı veritabanına kaydet
            await _tokenRepository.AddAsync(refreshToken);
            await _tokenRepository.SaveChangesAsync();

            return new TokenDto
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken.Token,
                Expiration = DateTime.UtcNow.AddMinutes(15) // Access Token ömrü
            };
        }

        private string CreateAccessToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["JwtSettings:Key"]);
            
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, user.Username),
                    new Claim(ClaimTypes.Role, user.Role),
                    new Claim("id", user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddMinutes(15), // Kısa ömürlü
                Issuer = _configuration["JwtSettings:Issuer"],
                Audience = _configuration["JwtSettings:Audience"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private RefreshToken CreateRefreshToken(User user)
        {
            return new RefreshToken
            {
                Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
                Expires = DateTime.UtcNow.AddDays(7), // Uzun ömürlü (7 gün)
                Created = DateTime.UtcNow,
                UserId = user.Id
            };
        }
    }
}