import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import M from 'materialize-css/dist/js/materialize.min.js';
import { getSavedSchedules, applySchedule } from '../../../actions/scheduleActions';

const CalendarLoadModal = ({
  savedSchedules: { collection },
  calendarSlots: { daysOnDisplay },
  getSavedSchedules,
  applySchedule,
}) => {
  useEffect(() => {
    document.addEventListener('DOMContentLoaded', function () {
      var elem = document.getElementById('load-calendar-modal');
      M.Modal.init(elem, { onCloseStart: clearCurrent });
    });

    getSavedSchedules();
    //eslint-disable-next-line
  }, []);

  const [current, setCurrent] = useState(null);

  const getHoursPerDay = (day) => moment.weekdays(day.dayOfWeek).substring(0, 3) + ' ' + day.slots.length / 2 + 'h.  ';

  const clearCurrent = () => {
    setCurrent(null);
    const listItems = document.querySelectorAll('#load-calendar-modal .collection-item');
    listItems.forEach((item) => (item.className = 'collection-item'));
  };
  const selectItem = (e) => {
    clearCurrent();
    e.target.className = 'collection-item active';
    setCurrent(collection.filter((el) => el.id === +e.target.id)[0]);
  };

  const onSubmit = () => {
    applySchedule({
      startDate: daysOnDisplay[0],
      id: +current.id,
    });
    M.toast({ html: `Schedule ${current.title} applied.` });
    clearCurrent();
  };

  return (
    <div id='load-calendar-modal' className='modal'>
      <div className='modal-content'>
        <h6>Apply a schedule from the list</h6>
        <div className='collection'>
          {collection &&
            collection.map((item) => (
              <a href='#!' key={item.id} id={item.id} className={'collection-item'} onClick={selectItem}>
                {item.title}
                <br />
                {item.days.map((d) => getHoursPerDay(d))}
              </a>
            ))}
        </div>
      </div>
      <div className='modal-footer'>
        <a href='#!' className='modal-close waves-effect waves-light grey lighten-3 btn-flat'>
          Cancel
        </a>
        <a
          href='#!'
          onClick={onSubmit}
          className={`modal-close waves-effect waves-green green white-text btn-flat ${
            current == null ? 'disabled' : ''
          }`}
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
  calendarSlots: state.calendarSlots,
});

export default connect(mapStateToProps, { getSavedSchedules, applySchedule })(CalendarLoadModal);
