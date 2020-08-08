using AutoMapper;
using MyTalki.Domain.Entities;

namespace MyTalki.Web.Models
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<LessonType, LessonTypeModel>().ReverseMap().ForMember(p => p.Id, opt => opt.Ignore());
            CreateMap<Offer, OfferModel>().ReverseMap().ForMember(p => p.Id, opt => opt.Ignore());
            CreateMap<User, UserModel>();
        }
    }
}
