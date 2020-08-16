using System.Collections.Generic;
using System.Threading.Tasks;
using MyTalki.Core.Persistence;
using MyTalki.Domain.Entities;

namespace MyTalki.Domain.Services.Impl
{
    public class StudentService : IStudentService
    {
        private readonly IEntityRepository _repository;

        public StudentService(IEntityRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<User>> GetStudentsAsync()
        {
            return await _repository.GetSomeAsync<User>(predicate: user => !user.IsAdmin);
        }
    }
}