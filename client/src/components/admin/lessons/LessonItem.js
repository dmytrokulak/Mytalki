import React, { Fragment } from 'react';
import moment from 'moment';

const LessonItem = ({ item }) => {
  return (
    <Fragment>
      <div className='lesson-info'>
        {new moment(item.dateTime).format('ddd MMMM DD, hh:mm')}-
        {new moment(item.dateTime).add(item.offer.time, 'm').format('hh:mm')}
        <br />
        {item.offer.lessonType.title}
      </div>
      <div className='user-info'>
        <span>
          {item.user.firstName} {item.user.lastName}
        </span>
        <br />
        <span>{item.communication}</span>
        {': '}
        {/*ToDo:: <span>{item.user.communication.filter((c) => c.tool === item.communication).map((c) => c.number)}</span> */}
      </div>
    </Fragment>
  );
};

export default LessonItem;
