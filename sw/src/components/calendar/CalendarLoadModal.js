import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSavedSchedules } from '../../actions/scheduleActions';

const CalendarLoadModal = ({ savedSchedules: { collection }, getSavedSchedules }) => {
  useEffect(() => {
    getSavedSchedules();
    //eslint-disable-next-line
  }, []);

  const getHoursPerDay = (day) => day.day[0].toUpperCase() + day.day.slice(1) + ' ' + day.times.length * 2 + 'h. ';
  return (
    <div id='load-calendar-modal' className='modal'>
      <div className='modal-content'>
        <h6>Apply a schedule from the list</h6>
        <div className='collection'>
          {collection &&
            collection.map((item) => (
              <a href='#!' className='collection-item'>
                {item.title}
                <br />
                {item.days.map((d) => getHoursPerDay(d))}
              </a>
            ))}
        </div>
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
            // M.toast({ html: `Schedule saved.` });
            // clearCurrent();
          }}
          className='modal-close waves-effect waves-green green white-text btn-flat'
        >
          Confirm
        </a>
      </div>
    </div>
  );
};

CalendarLoadModal.propTypes = {
  getSavedSchedules: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  savedSchedules: state.savedSchedules,
});

export default connect(mapStateToProps, { getSavedSchedules })(CalendarLoadModal);
