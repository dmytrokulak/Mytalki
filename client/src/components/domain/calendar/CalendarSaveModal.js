import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css/dist/js/materialize.min.js';
import { saveSchedule } from '../../../actions/scheduleActions';
import PropTypes from 'prop-types';

const CalendarSaveModal = ({ calendarSlots: { daysOnDisplay }, saveSchedule }) => {
  const [scheduleName, setScheduleName] = useState('');

  useEffect(() => {
    document.addEventListener('DOMContentLoaded', function () {
      var elem = document.getElementById('save-calendar-modal');
      M.Modal.init(elem, { onCloseStart: () => setScheduleName('') });
    });
    //eslint-disable-next-line
  }, []);

  return (
    <div id='save-calendar-modal' className='modal'>
      <div className='modal-content'>
        <h6>Save current schedule as</h6>
        <div className='input-field'>
          <input
            id='schedule_name'
            type='text'
            className='validate'
            value={scheduleName}
            onChange={(e) => setScheduleName(e.target.value)}
          />
          <label htmlFor='schedule_name'>Schedule name</label>
        </div>
      </div>
      <div className='modal-footer'>
        <a href='#!' className='modal-close waves-effect waves-light grey lighten-3 btn-flat'>
          Cancel
        </a>
        <a
          href='#!'
          onClick={() => {
            saveSchedule({
              startDate: daysOnDisplay[0],
              title: scheduleName,
            });
            M.toast({ html: `Schedule saved.` });
          }}
          className='modal-close waves-effect waves-green green white-text btn-flat'
        >
          Confirm
        </a>
      </div>
    </div>
  );
};

CalendarSaveModal.propTypes = {
  calendarSlots: PropTypes.object.isRequired,
  saveSchedule: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  calendarSlots: state.calendarSlots,
});

export default connect(mapStateToProps, { saveSchedule })(CalendarSaveModal);
