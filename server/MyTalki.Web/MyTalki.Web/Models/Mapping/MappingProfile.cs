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
            CreateMap<Offer, OfferModel>().ReverseMap().ForMember(p => p.Id, opt => opt.Ignore());
            CreateMap<User, UserModel>();
            CreateMap<CalendarSlotModel, CalendarSlot>().
                ForMember(p => p.Status, opt => opt.MapFrom(src => Enum.Parse<SlotStatus>(Capitalize(src.Status))));
            CreateMap<CalendarSlot, CalendarSlotModel>().
                ForMember(p => p.Status, opt => opt.MapFrom(src => ToSnake(src.Status.ToString())));
        }


        public static string Capitalize(string input)
        {
            return input.First().ToString().ToUpper() + input.Substring(1);
        }

        public static string ToSnake(string input)
        {
            var arr = input.ToCharArray();
            var sb = new StringBuilder(arr[0].ToString());
            for (int i = 1; i < arr.Length; i++)
            {
                if (char.IsUpper(arr[i]))
                {
                    sb.Append('_');
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
