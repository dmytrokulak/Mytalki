import React from 'react';

const CalendarLoadModal = () => {
  return (
    <div id='load-calendar-modal' className='modal'>
      <div className='modal-content'>
        <h6>Apply a schedule from the list</h6>
        <a className='dropdown-trigger btn' href='#' data-target='dropdown1'>
          Drop Me!
        </a>

        <ul id='dropdown1' className='dropdown-content'>
          <li>
            <a href='#!'>one</a>
          </li>
          <li>
            <a href='#!'>two</a>
          </li>
          <li className='divider' tabindex='-1'></li>
          <li>
            <a href='#!'>three</a>
          </li>
          <li>
            <a href='#!'>
              <i className='material-icons'>view_module</i>four
            </a>
          </li>
          <li>
            <a href='#!'>
              <i className='material-icons'>cloud</i>five
            </a>
          </li>
        </ul>
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

export default CalendarLoadModal;
