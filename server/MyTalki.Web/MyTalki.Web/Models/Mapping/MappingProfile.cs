using System;
using System.Collections.Generic;
using System.Linq;
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
            CreateMap<CalendarSlotModel, CalendarSlot>().
                ForMember(p => p.Status, opt => opt.MapFrom(src => Enum.Parse<SlotStatus>(Capitalize(src.Status))));
            CreateMap<CalendarSlot, CalendarSlotModel>().
                ForMember(p => p.Status, opt => opt.MapFrom(src => src.Status.ToString().ToLower()));
        }


        public static string Capitalize(string input)
        {
            return input.First().ToString().ToUpper() + input.Substring(1);
        }
    }
}
