using System.Threading.Tasks;
using MyTalki.Core.Domain.Exceptions;
using MyTalki.Core.Persistence;
using MyTalki.Domain.Entities;

namespace MyTalki.Domain.Services.Impl
{
    public class AccountService : IAccountService
    {
        private readonly IEntityRepository _repository;
        private readonly ITransactionFactory<ITransaction> _transactionFactory;

        public AccountService(IEntityRepository repository, ITransactionFactory<ITransaction> transactionFactory)
        {
            _repository = repository;
            _transactionFactory = transactionFactory;
        }

        public async Task ChangeNameAsync(int userId, string firstName, string lastName)
        {
            var entity = await _repository.GetAsync<User>(userId);
            using (var transaction = _transactionFactory.Begin())
            {
                entity.FirstName = firstName;
                entity.LastName = lastName;
                transaction.Save();
            }
        }

       

        public async Task ChangeTimezoneAsync(int userId, string timezone)
        {
            var entity = await _repository.GetAsync<User>(userId);
            using (var transaction = _transactionFactory.Begin())
            {
                entity.TimeZone = timezone;
                transaction.Save();
            }
        }

        public async Task AddMessengerAsync(int userId, string tool, string number)
        {
            throw new System.NotImplementedException();
        }

        public async Task ChangeMessengerAsync(int messengerId, string number)
        {
            throw new System.NotImplementedException();
        }

        public async Task RemoveMessengerAsync(int messengerId)
        {
            throw new System.NotImplementedException();
        }
    }
}