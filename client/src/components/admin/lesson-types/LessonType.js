import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LessonTypeOffer from './LessonTypeOffer';
import M from 'materialize-css/dist/js/materialize.min.js';
import { setCurrent, updateLessonType } from '../../../actions/lessonTypeActions';

const LessonType = ({ lessonTypes: { collection }, id, setCurrent, updateLessonType }) => {
  let item = collection.filter((c) => c.id === id)[0];

  const [active, setActive] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (item) {
      let thisActive = item.offers.map((o) => o.active).reduce((a, b) => a + b);
      let thisTotal = item.offers.map((o) => o.done).reduce((a, b) => a + b) + thisActive;
      setActive(thisActive);
      setTotal(thisTotal);
    }
  }, [item]);

  const suspendLessonType = () => {
    item.onSale = false;
    M.toast({ html: `Lesson type ${item.title} suspended.` });
    updateLessonType(item);
  };

  const restoreLessonType = () => {
    item.onSale = true;
    M.toast({ html: `Lesson type ${item.title} restored.` });
    updateLessonType(item);
  };

  return (
    item && (
      <li>
        <div className='collapsible-header'>
          <h5>
            <i className='material-icons'>expand_more</i>
            {item.title}
            {!item.onSale && (
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
                <LessonTypeOffer lessonTypeId={item.id} offerId={offer.id} />
              </div>
            ))}
          </div>
          <div className='lesson-type-actions'>
            {item.onSale ? (
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
    )
  );
};

LessonType.propTypes = {
  item: PropTypes.object.isRequired,
  setCurrent: PropTypes.func.isRequired,
  updateLessonType: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  lessonTypes: state.lessonTypes,
});

export default connect(mapStateToProps, { setCurrent, updateLessonType })(LessonType);
