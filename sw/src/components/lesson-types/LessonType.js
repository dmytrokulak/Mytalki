import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LessonTypeOffer from './LessonTypeOffer';
import { setCurrent } from '../../actions/lessonTypeActions';

const LessonType = ({ item, setCurrent }) => {
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
            <div className='col l3' key={offer.id}>
              <LessonTypeOffer offer={offer} />
            </div>
          ))}
        </div>
        <div className='lesson-type-actions'>
          <a href='#!' className='waves-effect waves-light red btn right'>
            Suspend
          </a>
          <a
            href='#lesson-type-modal'
            onClick={() => setCurrent(item)}
            className='waves-effect waves-light blue btn right modal-trigger'
          >
            Change
          </a>
          <div className='clearfix'></div>
        </div>
      </div>
    </li>
  );
};

LessonType.propTypes = {
  item: PropTypes.object.isRequired,
  setCurrent: PropTypes.func.isRequired,
};

export default connect(null, { setCurrent })(LessonType);
