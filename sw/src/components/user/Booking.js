import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLessonTypes } from '../../actions/lessonTypeActions';
import { setCurrentBooking } from '../../actions/bookingAction';
import M from 'materialize-css/dist/js/materialize.min.js';

const Booking = ({ lessonTypes: { collection }, getLessonTypes, setCurrentBooking, history }) => {
  useEffect(() => {
    getLessonTypes();
  }, []);

  const onButtonClick = (e) => {
    let lessonType = collection.filter((lt) => lt.id === +e.target.dataset.lessonTypeId)[0];
    let offer = lessonType.offers.filter((o) => o.id === +e.target.dataset.offerId)[0];
    setCurrentBooking({ lessonType, offer });
    M.toast({ html: `${lessonType.title} ${offer.time} min selected` });
    setTimeout(() => {
      history.push('/calendar');
    }, 500);
  };

  return (
    <div id='section-booking' clasName='section'>
      <h4 className='center-align'>Book a lesson</h4>
      <ul className='collection'>
        {collection &&
          collection.map((item) => (
            <li className='collection-item'>
              <div className='row'>
                <div className='col s7'>
                  <h5>{item.title}</h5>
                  <span>{item.description}</span>
                </div>
                <div className='col s5'>
                  {item.offers.map((offer) => (
                    <a
                      href='#!'
                      className='teal lighten-1 btn'
                      data-lesson-type-id={item.id}
                      data-offer-id={offer.id}
                      data-time={offer.time}
                      onClick={onButtonClick}
                    >
                      {offer.time} min/{offer.price} {offer.currency}{' '}
                    </a>
                  ))}
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

Booking.propTypes = {
  lessonTypes: PropTypes.object.isRequired,
  getLessonTypes: PropTypes.func.isRequired,
  setCurrentBooking: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  lessonTypes: state.lessonTypes,
});

export default connect(mapStateToProps, { getLessonTypes, setCurrentBooking })(Booking);
