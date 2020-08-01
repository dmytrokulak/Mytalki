import React, { useEffect, useState, Fragment } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';
import {
  getCalendar,
  addSlotToCalendar,
  deleteSlotFromCalendar,
  setDaysOnDisplay,
} from '../../actions/calendarActions';
import CalendarSaveModal from './CalendarSaveModal';
import CalendarLoadModal from './CalendarLoadModal';
import Preloader from '../layout/Preloader';

const daysVisible = 7;
const initMoment = new moment.utc().hours(0).minutes(0).seconds(0);
let page = 0;

const Calendar = ({
  calendarSlots: { collection, daysOnDisplay, loading },
  getCalendar,
  addSlotToCalendar,
  deleteSlotFromCalendar,
  setDaysOnDisplay,
}) => {
  const [weekStartMoment, setWeekStartMoment] = useState(initMoment.clone());

  const nextPage = () => {
    page += 1;
    getDaysOnDisplay();
  };

  const previousPage = () => {
    if (page > 0) {
      page -= 1;
    }
    getDaysOnDisplay();
  };

  const getDaysOnDisplay = () => {
    let days = [];
    for (let i = 0; i < daysVisible; i++) {
      days.push(initMoment.clone().add(i + daysVisible * page, 'd'));
    }
    setDaysOnDisplay(days);
    setWeekStartMoment(initMoment.clone().add(daysVisible * page, 'd'));
  };

  useEffect(() => {
    M.AutoInit();
    getCalendar();
    getDaysOnDisplay();
    //eslint-disable-next-line
  }, []);

  const selectSlotSprint = (e) => {
    const hours = +e.target.dataset.hours;
    const minutes = +e.target.dataset.minutes;
    for (let i = 0; i < daysVisible; i++) {
      let slotMoment = weekStartMoment.clone();
      slotMoment.add(i, 'd').hours(hours).minutes(minutes);
      const slot = collection.find((item) => slotMoment.isSame(moment(item.start), 'm'));
      if (!slot) {
        setTimeout(() => {
          addSlotToCalendar({
            start: slotMoment,
            status: 'vacant',
          });
        }, 1500);
      }
    }
  };

  const deSelectSlotSprint = (e) => {
    const hours = +e.target.dataset.hours;
    const minutes = +e.target.dataset.minutes;
    for (let i = 0; i < daysVisible; i++) {
      let slotMoment = weekStartMoment.clone();
      slotMoment.add(i, 'd').hours(hours).minutes(minutes);
      const slot = collection.find((item) => slotMoment.isSame(moment(item.start), 'm'));
      if (slot && !slot.booked) {
        setTimeout(() => {
          deleteSlotFromCalendar(slot.id);
        }, 1500);
      }
    }
  };

  const toggleSlotAvailability = (e) => {
    if (e.target.dataset.available === 'true') {
      if (e.target.dataset.booked === 'true') {
        M.toast({ html: `Cannot remove a booked slot.` });
      } else {
        deleteSlotFromCalendar(+e.target.dataset.slotId);
      }
    } else {
      addSlotToCalendar({
        start: e.target.dataset.datetime,
        status: 'vacant',
      });
    }
  };

  const drawCalendarHeader = () =>
    daysOnDisplay &&
    daysOnDisplay.map((day, index) => (
      <th key={index} className='center-align'>
        {day.format('ddd, DD MMM')}
      </th>
    ));

  const drawCalendarBody = () => {
    const slotSprint = [];
    for (let i = 0; i < 24 * 2; i++) {
      let timeMoment = weekStartMoment.clone();
      timeMoment.add(Math.floor(i / 2), 'h').add((i % 2) * 30, 'm');
      slotSprint.push(
        <tr key={timeMoment.unix()}>
          <td className='center-align'>{timeMoment.format('HH:mm')}</td>
          {(() => {
            const slots = [];
            for (let j = 0; j < daysVisible; j++) {
              if (collection) {
                const slotMoment = weekStartMoment
                  .clone()
                  .add(j, 'd')
                  .add(timeMoment.hours(), 'h')
                  .add(timeMoment.minutes(), 'm');
                const slot = collection.find((item) => slotMoment.isSame(moment(item.start), 'm'));
                let className = 'blocked';
                let isAvailable = false;
                let isBooked = false;
                let slotId = 0;
                if (slot) {
                  isAvailable = true;
                  isBooked = slot.status !== 'vacant';
                  className = slot.status;
                  slotId = slot.id;
                }
                //td slot
                slots.push(
                  <td
                    onClick={toggleSlotAvailability}
                    className={className}
                    key={slotMoment.unix()}
                    data-datetime={slotMoment.toISOString()}
                    data-available={isAvailable}
                    data-booked={isBooked}
                    data-slot-id={slotId}
                  ></td>
                );
              }
            }
            return slots;
          })()}
          {drawSprintButtons(timeMoment)}
        </tr>
      );
    }
    return slotSprint;
  };

  const drawSprintButtons = (timeMoment) => (
    <Fragment>
      <td className='action-cell'>
        <span className='green-text'>
          <i
            className='small material-icons'
            data-hours={timeMoment.hours()}
            data-minutes={timeMoment.minutes()}
            onClick={selectSlotSprint}
          >
            add
          </i>
        </span>
        <span className='red-text'>
          <i
            className='small material-icons'
            data-hours={timeMoment.hours()}
            data-minutes={timeMoment.minutes()}
            onClick={deSelectSlotSprint}
          >
            remove
          </i>
        </span>
      </td>
    </Fragment>
  );

  return (
    <div id='section-calendar' className='section'>
      <h4 className='center-align'>Calendar</h4>
      {loading || collection === null || collection.lenght === 0 ? (
        <Preloader />
      ) : (
        <table>
          <thead>
            <tr>
              <th className='center-align btn-paging'>
                {page > 0 && (
                  <i onClick={previousPage} className='small material-icons'>
                    arrow_back
                  </i>
                )}
              </th>
              {drawCalendarHeader()}
              <th onClick={nextPage} className='center-align btn-paging'>
                <i className='small material-icons'>arrow_forward</i>
              </th>
            </tr>
          </thead>
          <tbody>{drawCalendarBody()}</tbody>
        </table>
      )}

      <div className='fixed-action-btn'>
        <a
          href='#save-calendar-modal'
          className='btn-floating btn-large teal tooltipped modal-trigger'
          data-position='left'
          data-tooltip='Save current calendar schedule'
        >
          <i className='large material-icons'>save</i>
        </a>
        <ul>
          <li>
            <a
              href='#load-calendar-modal'
              className='btn-floating green tooltipped modal-trigger'
              data-position='left'
              data-tooltip='Load a calendar schedule'
            >
              <i className='material-icons'>folder_open</i>
            </a>
          </li>
        </ul>
      </div>
      <CalendarSaveModal />
      <CalendarLoadModal />
    </div>
  );
};

Calendar.propTypes = {
  calendarSlots: PropTypes.object.isRequired,
  getCalendar: PropTypes.func.isRequired,
  addSlotToCalendar: PropTypes.func.isRequired,
  deleteSlotFromCalendar: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  calendarSlots: state.calendarSlots,
});
export default connect(mapStateToProps, { getCalendar, addSlotToCalendar, deleteSlotFromCalendar, setDaysOnDisplay })(
  Calendar
);
