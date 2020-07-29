import React from 'react';

const CalendarSaveModal = () => {
  return (
    <div id='save-calendar-modal' className='modal'>
      <div className='modal-content'>
        <h6>Save current schedule as</h6>
        <div class='input-field'>
          <input placeholder='Placeholder' id='schedule_name' type='text' class='validate' />
          <label for='schedule_name'>Schedule name</label>
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

export default CalendarSaveModal;
