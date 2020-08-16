using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using MyTalki.Domain.Entities;

namespace MyTalki.Domain.Services
{
    public interface IStudentService
    {
        Task<IEnumerable<User>> GetStudentsAsync();
    }
}
