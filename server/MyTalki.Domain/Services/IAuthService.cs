using System.Threading.Tasks;
using MyTalki.Domain.Entities;

namespace MyTalki.Domain.Services
{
    public interface IAuthService
    {
        Task<string> LoginAsync(string email, string password, string secret);
        Task<string> RegisterAsync(string email, string password, string secret, string firstName, string lastName);
        Task<User> GetCurrentUserAsync(string token);
        Task<User> GetAdminUserAsync();
    }
}
