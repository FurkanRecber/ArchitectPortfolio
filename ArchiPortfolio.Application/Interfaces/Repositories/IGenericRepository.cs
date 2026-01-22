using System.Linq.Expressions; 
using ArchiPortfolio.Domain.Common;

namespace ArchiPortfolio.Application.Interfaces.Repositories
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        // Okuma İşlemleri
        Task<List<T>> GetAllAsync();
        Task<T> GetByIdAsync(int id);
        
        // Şartlı Sorgu (Örn: Sadece "Featured" projeleri getir)
        Task<List<T>> GetWhereAsync(Expression<Func<T, bool>> expression);

        // Yazma İşlemleri
        Task AddAsync(T entity);
        void Update(T entity);
        void Delete(T entity);
        
        // Değişiklikleri Kaydet
        Task<int> SaveChangesAsync();
    }
}