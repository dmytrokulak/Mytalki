import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LessonTypeOffer from './LessonTypeOffer';
import M from 'materialize-css/dist/js/materialize.min.js';
import { setCurrent, updateLessonType } from '../../actions/lessonTypeActions';

const LessonType = ({ item, setCurrent, updateLessonType }) => {
  let active = item.offers.map((o) => o.active).reduce((a, b) => a + b);
  let total = item.offers.map((o) => o.done).reduce((a, b) => a + b) + active;

  const suspendLessonType = () => {
    item.active = false;
    M.toast({ html: `Lesson type ${item.title} suspended.` });
    updateLessonType(item);
  };

  const restoreLessonType = () => {
    item.active = true;
    M.toast({ html: `Lesson type ${item.title} restored.` });
    updateLessonType(item);
  };

  return (
    <li>
      <div className='collapsible-header'>
        <h5>
          <i className='material-icons'>details</i>
          {item.title}
          {!item.active && (
            <span className='new badge red' data-badge-caption=''>
              suspended
            </span>
          )}
        </h5>
        <span>
          {total > 0 && (
            <span className='badge' data-badge-caption='Total'>
              {total}
            </span>
          )}
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
          {item.active ? (
            <a href='#!' onClick={suspendLessonType} className='waves-effect waves-light red btn right'>
              Suspend
            </a>
          ) : (
            <Fragment>
              <a
                href='#confirm-delete-modal'
                onClick={() => setCurrent(item)}
                className='waves-effect waves-light red btn right modal-trigger'
              >
                Delete
              </a>
              <a href='#!' onClick={restoreLessonType} className='waves-effect waves-light green btn right'>
                Restore
              </a>
            </Fragment>
          )}
          <a
            href='#lesson-type-modal'
            onClick={() => setCurrent(item)}
            className='waves-effect waves-light teal btn right modal-trigger'
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
  updateLessonType: PropTypes.func.isRequired,
};

export default connect(null, { setCurrent, updateLessonType })(LessonType);
