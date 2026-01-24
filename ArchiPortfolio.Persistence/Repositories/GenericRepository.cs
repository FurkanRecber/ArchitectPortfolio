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

        // Tüm veriyi ilişkileriyle getir
        public async Task<List<T>> GetAllAsync(params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> query = _dbSet.AsNoTracking();
            if (includes != null)
            {
                query = includes.Aggregate(query, (current, include) => current.Include(include));
            }
            return await query.ToListAsync();
        }
        
        public async Task<T> GetAsync(Expression<Func<T, bool>> expression, params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> query = _dbSet;
            if (includes != null)
            {
                query = includes.Aggregate(query, (current, include) => current.Include(include));
            }
            return await query.FirstOrDefaultAsync(expression);
        }

        // ID'ye göre ilişkileriyle getir
        public async Task<T> GetByIdAsync(int id, params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> query = _dbSet;
            if (includes != null)
            {
                query = includes.Aggregate(query, (current, include) => current.Include(include));
            }
            return await query.FirstOrDefaultAsync(x => x.Id == id);
        }

        // Şarta göre ilişkileriyle getir
        public async Task<List<T>> GetWhereAsync(Expression<Func<T, bool>> expression, params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> query = _dbSet.Where(expression).AsNoTracking();
            if (includes != null)
            {
                query = includes.Aggregate(query, (current, include) => current.Include(include));
            }
            return await query.ToListAsync();
        }

        public async Task AddAsync(T entity) => await _dbSet.AddAsync(entity);
        public void Update(T entity) => _dbSet.Update(entity);
        public void Delete(T entity) => _dbSet.Remove(entity);
        public async Task<int> SaveChangesAsync() => await _context.SaveChangesAsync();
    }
}