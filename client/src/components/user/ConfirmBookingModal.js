import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { addRequestToCalendar } from '../../actions/bookingActions';

const ConfirmBookingModal = ({
  booking: { lessonType, offer, selectedSlots },
  auth: { user },
  addRequestToCalendar,
}) => {
  const moments = selectedSlots.map((s) => new moment(s.start)).sort((a, b) => a.subtract(b));
  const start = moments[0];
  return (
    <div id='confirm-booking-modal' className='modal'>
      <div className='modal-content'>
        <h6>Placing a request for</h6>
        {lessonType && start && (
          <span>
            {lessonType.title} {offer.time} min starting on {start.format('MMM DD')} at {start.format('hh::mm')} ?
          </span>
        )}
      </div>
      <div className='modal-footer'>
        <a
          href='#!'
          onClick={() => {
            // clearCurrent();
          }}
          className='modal-close waves-effect waves-light grey lighten-3 btn-flat'
        >
          Cancel
        </a>
        <a
          href='#!'
          onClick={() => {
            selectedSlots.forEach((slot) => {
              slot.userId = user.id;
              slot.status = 'book-request';
            });
            addRequestToCalendar(
              selectedSlots.map((slot) => slot.id),
              lessonType.id,
              offer.id
            );
          }}
          className='modal-close waves-effect waves-green green white-text btn-flat'
        >
          Confirm
        </a>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  booking: state.booking,
  auth: state.auth,
});

export default connect(mapStateToProps, { addRequestToCalendar })(ConfirmBookingModal);
