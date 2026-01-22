using System.Linq.Expressions;
using ArchiPortfolio.Application.Interfaces.Repositories;
using ArchiPortfolio.Domain.Common;
using ArchiPortfolio.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace ArchiPortfolio.Persistence.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
    {
        private readonly ArchiPortfolioDbContext _context;
        private readonly DbSet<T> _dbSet;

        public GenericRepository(ArchiPortfolioDbContext context)
        {
            _context = context;
            _dbSet = _context.Set<T>();
        }

        public async Task<List<T>> GetAllAsync()
        {
            return await _dbSet.AsNoTracking().ToListAsync(); // AsNoTracking performans artırır (Sadece okuma yaparken)
        }

        public async Task<T> GetByIdAsync(int id)
        {
            return await _dbSet.FindAsync(id);
        }

        public async Task<List<T>> GetWhereAsync(Expression<Func<T, bool>> expression)
        {
            return await _dbSet.Where(expression).AsNoTracking().ToListAsync();
        }

        public async Task AddAsync(T entity)
        {
            await _dbSet.AddAsync(entity);
        }

        public void Update(T entity)
        {
            _dbSet.Update(entity);
        }

        public void Delete(T entity)
        {
            _dbSet.Remove(entity);
            // Veya Soft Delete: entity.IsDeleted = true; _dbSet.Update(entity);
        }
        
        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }
    }
}