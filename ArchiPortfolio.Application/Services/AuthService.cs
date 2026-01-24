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
            HashingHelper.CreatePasswordHash(loginDto.Password, out byte[] passwordHash, out byte[] passwordSalt);

            var user = new User
            {
                Username = loginDto.Username,
                // Email alanın varsa buraya: Email = loginDto.Username, ekleyebilirsin
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                Role = "Admin",
                Status = true,
                CreatedDate = DateTime.UtcNow
            };

            await _userRepository.AddAsync(user);
            await _userRepository.SaveChangesAsync();
            return user;
        }

        public async Task<TokenDto> LoginAsync(LoginDto loginDto)
        {
            // 1. Kullanıcıyı veritabanından direkt sorgulayarak bul (Daha hızlı)
            // Eğer User tablosunda Email alanı eklediysen: u.Email == loginDto.Username || u.Username == ... yapabilirsin.
            var user = await _userRepository.GetAsync(u => u.Username == loginDto.Username);

            if (user == null) return null; // Kullanıcı yok

            // 2. Şifre Doğrulama
            if (!HashingHelper.VerifyPasswordHash(loginDto.Password, user.PasswordHash, user.PasswordSalt))
                return null; // Şifre yanlış

            // 3. Token Üret
            return await CreateTokenDtoAsync(user);
        }

        public async Task<TokenDto> RefreshTokenAsync(string token)
        {
            var storedToken = await _tokenRepository.GetAsync(t => t.Token == token);

            if (storedToken == null || !storedToken.IsActive)
                return null;

            storedToken.Revoked = DateTime.UtcNow;
            _tokenRepository.Update(storedToken);
            await _tokenRepository.SaveChangesAsync();

            var user = await _userRepository.GetByIdAsync(storedToken.UserId);
            return await CreateTokenDtoAsync(user);
        }

        // --- YARDIMCI METOTLAR ---

        private async Task<TokenDto> CreateTokenDtoAsync(User user)
        {
            var accessToken = CreateAccessToken(user);
            var refreshToken = CreateRefreshToken(user);

            await _tokenRepository.AddAsync(refreshToken);
            await _tokenRepository.SaveChangesAsync();

            return new TokenDto
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken.Token,
                Expiration = DateTime.UtcNow.AddMinutes(60)
            };
        }

        private string CreateAccessToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            
            // DÜZELTME BURADA: Encoding.UTF8 yapıldı (Program.cs ile eşleşti)
            var key = Encoding.UTF8.GetBytes(_configuration["JwtSettings:Key"]);
            
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, user.Username ?? ""),
                    new Claim(ClaimTypes.Role, user.Role ?? "User"),
                    new Claim("id", user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddMinutes(60), // Token ömrü 1 saat
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
                Expires = DateTime.UtcNow.AddDays(7),
                Created = DateTime.UtcNow,
                UserId = user.Id
            };
        }
    }
}