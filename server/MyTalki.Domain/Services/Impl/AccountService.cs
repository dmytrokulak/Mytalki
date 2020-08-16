using System.Threading.Tasks;
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

        public async Task ChangeNameAsync(int id, string firstName, string lastName)
        {
            var entity = await _repository.GetAsync<User>(id);
            using (var transaction = _transactionFactory.Begin())
            {
                entity.FirstName = firstName;
                entity.LastName = lastName;
                transaction.Save();
            }
        }
    }
}