using System.Collections.Generic;
using System.Threading.Tasks;
using MyTalki.Domain.Entities;
using MyTalki.Domain.Queries;

namespace MyTalki.Domain.Services
{
    public interface ILessonTypeService
    {
        Task<ICollection<LessonType>> GetLessonTypesAsync();
        Task<LessonType> GetLessonTypeAsync(int id);
        Task<ICollection<LessonType>> GetLessonTypesAsync(LessonTypeQuery query);
        Task<LessonType> CreateLessonTypeAsync(LessonType entity);
        Task ModifyLessonTypeAsync(int id, LessonType entity);
        Task SuspendLessonTypeAsync(int id);
        Task RestoreLessonTypeAsync(int id);
        Task DeleteLessonTypeAsync(int id);
    }
}
