import React, { Fragment } from 'react';
import moment from 'moment';

const UserLessonItem = ({ item, teacher }) => {
  return (
    <Fragment>
      <div className='lesson-info'>
        {new moment(item.dateTime).format('ddd MMMM DD, hh:mm')}-
        {new moment(item.dateTime).add(item.offer.minutes, 'm').format('hh:mm')}
        <br />
        {item.lessonType.title}
      </div>
      <div className='user-info'>
        <span>
          {teacher.firstName} {teacher.lastName}
        </span>
        <br />
        <span>{item.communication}</span>
        {': '}
        <span>{teacher.communication.filter((c) => c.tool === item.communication).map((c) => c.number)}</span>
      </div>
    </Fragment>
  );
};

export default UserLessonItem;
