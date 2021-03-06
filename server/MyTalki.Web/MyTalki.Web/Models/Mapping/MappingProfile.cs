﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AutoMapper;
using MyTalki.Domain.Entities;

namespace MyTalki.Web.Models
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<LessonType, LessonTypeModel>().ReverseMap().ForMember(p => p.Id, opt => opt.Ignore());
            CreateMap<Offer, OfferModel>()
                .ForMember(p => p.Active, opt => opt.MapFrom(o => o.Lessons.Count(l => l.Status <= LessonStatus.Ongoing )))
                .ForMember(p => p.Done, opt => opt.MapFrom(o => o.Lessons.Count(l => l.Status == LessonStatus.Passed || l.Status == LessonStatus.Completed )))
                .ReverseMap().ForMember(p => p.Id, opt => opt.Ignore());
            CreateMap<CalendarSlotModel, CalendarSlot>().
                ForMember(p => p.Status, opt => opt.MapFrom(src => Enum.Parse<SlotStatus>(Capitalize(src.Status))));
            CreateMap<CalendarSlot, CalendarSlotModel>().
                ForMember(p => p.Status, opt => opt.MapFrom(src => Hyphenize(src.Status.ToString())));
            CreateMap<Lesson, LessonModel>().ReverseMap();
            CreateMap<LessonModel, Lesson>().
                ForMember(p => p.Status, opt => opt.MapFrom(src => Enum.Parse<LessonStatus>(Capitalize(src.Status))));
            CreateMap<Lesson, LessonModel>().
                ForMember(p => p.Status, opt => opt.MapFrom(src => src.Status.ToString().ToLower()));
            CreateMap<Schedule, ScheduleModel>().ReverseMap();
            CreateMap<ScheduleDay, ScheduleDayModel>().ReverseMap();
            CreateMap<ScheduleSlot, ScheduleSlotModel>().ReverseMap();
            CreateMap<User, UserModel>().ForMember(u => u.Timezone, opt => opt.MapFrom(u => new
                    TimeZoneModel(u.TimeZone, TimeZoneInfo.FindSystemTimeZoneById(u.TimeZone).DisplayName)
            )).ForMember(u => u.Avatar, opt => opt.MapFrom(u =>  "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"));
            CreateMap<User, StudentModel>().ForMember(u => u.Avatar, opt => opt.MapFrom(u =>  "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"));

        }


        public static string Capitalize(string input)
        {
            return input.First().ToString().ToUpper() + input.Substring(1);
        }

        public static string Hyphenize(string input)
        {
            var arr = input.ToCharArray();
            var sb = new StringBuilder(char.ToLower(arr[0]).ToString());
            for (int i = 1; i < arr.Length; i++)
            {
                if (char.IsUpper(arr[i]))
                {
                    sb.Append('-');
                    sb.Append(char.ToLower(arr[i]));
                }
                else
                {
                    sb.Append(arr[i]);
                }
            }

            return sb.ToString();
        }
    }
}
