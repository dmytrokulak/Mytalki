using System.Threading.Tasks;

namespace MyTalki.Domain.Services
{
    public interface IAccountService
    {
        Task ChangeNameAsync(int userId, string firstName, string lastName);
        Task ChangeTimezoneAsync(int userId, string timezone);
        Task AddMessengerAsync(int userId, string tool, string number);
        Task ChangeMessengerAsync(int messengerId, string number);
        Task RemoveMessengerAsync(int messengerId);
    }
}
