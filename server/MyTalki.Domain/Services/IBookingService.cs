﻿using System.Collections.Generic;
using System.Threading.Tasks;
using MyTalki.Domain.Entities;

namespace MyTalki.Domain.Services
{
    public interface IBookingService
    {
        Task<Lesson> AddLessonRequestAsync(int offerId, IEnumerable<int> slotIds, int userId);
        Task AcceptLessonRequestAsync(int lessonId);
        Task DeclineLessonRequestAsync(int lessonId);
    }
}
