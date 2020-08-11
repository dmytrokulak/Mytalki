﻿using System.Collections.Generic;
using System.Threading.Tasks;
using MyTalki.Domain.Entities;

namespace MyTalki.Domain.Services
{
    public interface IBookingService
    {
        Task<Lesson> AddLessonRequestAsync(int lessonTypeId, int offerId, IEnumerable<int> slotIds, User user);
    }
}
