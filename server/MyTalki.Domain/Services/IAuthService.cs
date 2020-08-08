using System.Threading.Tasks;

namespace MyTalki.Domain.Services
{
    public interface IAuthService
    {
        Task<string> LoginAsync(string email, string password, string secret);
        Task<string> RegisterAsync(string email, string password, string secret, string firstName, string lastName);
    }
}
