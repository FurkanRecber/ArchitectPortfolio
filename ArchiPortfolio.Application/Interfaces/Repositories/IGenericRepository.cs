using System.Linq.Expressions; 
using ArchiPortfolio.Domain.Common;

namespace ArchiPortfolio.Application.Interfaces.Repositories
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        // İlişkili tabloları (includes) dahil ederek getirme özellikleri ekliyoruz
        Task<List<T>> GetAllAsync(params Expression<Func<T, object>>[] includes);
        
        Task<T> GetAsync(Expression<Func<T, bool>> expression, params Expression<Func<T, object>>[] includes);
        Task<T> GetByIdAsync(int id, params Expression<Func<T, object>>[] includes);
        Task<List<T>> GetWhereAsync(Expression<Func<T, bool>> expression, params Expression<Func<T, object>>[] includes);

        Task AddAsync(T entity);
        void Update(T entity);
        void Delete(T entity);
        Task<int> SaveChangesAsync();
    }
}