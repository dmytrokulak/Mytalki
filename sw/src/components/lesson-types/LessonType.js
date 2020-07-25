import React from 'react';
import LessonTypeOffer from './LessonTypeOffer';

const LessonType = ({ item }) => {
  let active = item.offers.map((o) => o.active).reduce((a, b) => a + b);
  let total = item.offers.map((o) => o.done).reduce((a, b) => a + b) + active;

  return (
    <li>
      <div className='collapsible-header'>
        <h5>
          <i className='material-icons'>details</i>
          {item.name}
        </h5>
        <span>
          <span className='badge' data-badge-caption='Total'>
            {total}
          </span>
          {active > 0 && (
            <span className='new badge' data-badge-caption='Active'>
              {active}
            </span>
          )}
        </span>
      </div>
      <div className='collapsible-body'>
        <blockquote>{item.description}</blockquote>
        <div className='row'>
          {item.offers.map((offer) => (
            <div class=' col l3'>
              <LessonTypeOffer offer={offer} key={offer.id} />
            </div>
          ))}
        </div>
        <div className='lesson-type-actions'>
          <a className='waves-effect waves-light red btn right'>Suspend</a>
          <a href='#lesson-type-modal' className='waves-effect waves-light blue btn right modal-trigger'>
            Change
          </a>
          <div className='clearfix'></div>
        </div>
      </div>
    </li>
  );
};

export default LessonType;
