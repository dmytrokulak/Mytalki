using System.Threading.Tasks;

namespace MyTalki.Domain.Services
{
    public interface IAccountService
    {
        Task ChangeNameAsync(int id, string firstName, string lastName);
    }
}
