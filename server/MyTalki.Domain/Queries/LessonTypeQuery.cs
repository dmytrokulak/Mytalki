using MyTalki.Core.Domain.Queries;

namespace MyTalki.Domain.Queries
{
    public class LessonTypeQuery : QueryBase
    {
        public string FilterTitleLike { get; set; }
        public bool? FilterActive { get; set; }
    }
}
