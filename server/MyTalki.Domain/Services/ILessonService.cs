using System.Collections.Generic;
using System.Threading.Tasks;
using MyTalki.Domain.Entities;
using MyTalki.Domain.Queries;

namespace MyTalki.Domain.Services
{
    public interface ILessonService
    {
        Task<ICollection<Lesson>> GetLessonsAsync();
        Task<ICollection<Lesson>> GetLessonsForUserAsync(int userId);
      //  Task<Lesson> GetLessonAsync(int id);
        //Task<ICollection<Lesson>> GetLessonsAsync(LessonQuery query);
        //Task<Lesson> CreateLessonAsync(Lesson entity);
        //Task ModifyLessonAsync(int id, Lesson entity);
        //Task SuspendLessonAsync(int id);
        //Task RestoreLessonAsync(int id);
        //Task DeleteLessonAsync(int id);
    }
}
