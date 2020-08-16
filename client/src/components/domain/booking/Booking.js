import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLessonTypes } from '../../../actions/lessonTypeActions';
import { setCurrentBooking } from '../../../actions/bookingActions';
import M from 'materialize-css/dist/js/materialize.min.js';

const Booking = ({
  lessonTypes: { collection },
  auth: { isAuthenticated },
  getLessonTypes,
  setCurrentBooking,
  history,
}) => {
  useEffect(() => {
    getLessonTypes();
    //eslint-disable-next-line
  }, []);

  const onButtonClick = (e) => {
    let lessonType = collection.filter((lt) => lt.id === +e.target.dataset.lessonTypeId)[0];
    let offer = lessonType.offers.filter((o) => o.id === +e.target.dataset.offerId)[0];
    setCurrentBooking({ lessonType, offer });
    M.toast({ html: `${lessonType.title} ${offer.minutes} min selected` });
    if (isAuthenticated) {
      history.push('/calendar');
    } else {
      M.toast({ html: 'Please login to proceed' });
      history.push('/login?nextUrl=calendar');
    }
  };

  return (
    <div id='section-booking' className='section'>
      <h4 className='center-align'>Book a lesson</h4>
      <ul className='collection'>
        {collection &&
          collection.map((item) => (
            <li key={`${item.id}`} className='collection-item'>
              <div className='row'>
                <div className='col s7'>
                  <h5>{item.title}</h5>
                  <span>{item.description}</span>
                </div>
                <div className='col s5'>
                  {item.offers.map((offer) => (
                    <a
                      key={`${item.id}-${offer.id}`}
                      href='#!'
                      className='teal lighten-1 btn'
                      data-lesson-type-id={item.id}
                      data-offer-id={offer.id}
                      data-minutes={offer.minutes}
                      onClick={onButtonClick}
                    >
                      {offer.minutes} min/{offer.price} {offer.currency}{' '}
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
  auth: state.auth,
});

export default connect(mapStateToProps, { getLessonTypes, setCurrentBooking })(Booking);
