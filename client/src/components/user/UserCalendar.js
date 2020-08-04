import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';
import { getCalendar, addSlotToCalendar, setDaysOnDisplay } from '../../actions/calendarActions';
import { setSelectedSlots, clearBooking } from '../../actions/bookingActions';
import Preloader from '../layout/Preloader';
import ConfirmBookingModal from './ConfirmBookingModal';

const daysVisible = 7;
const initMoment = new moment.utc().hours(0).minutes(0).seconds(0);
let page = 0;

const UserCalendar = ({
  calendarSlots: { collection, daysOnDisplay, loading },
  booking: { offer, selectedSlots },
  auth: { isAuthenticated, user },
  getCalendar,
  addSlotToCalendar,
  setDaysOnDisplay,
  setSelectedSlots,
  clearBooking,
}) => {
  const [weekStartMoment, setWeekStartMoment] = useState(initMoment.clone());

  useEffect(() => {
    M.AutoInit();
    getCalendar();
    getDaysOnDisplay();
    //eslint-disable-next-line
  }, []);

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

  const clearSelectedSlots = () => {
    document.querySelectorAll('.cell-selected').forEach((cell) => cell.classList.remove('cell-selected'));
  };
  const onSlotSelected = (e) => {
    if (offer && isAuthenticated) {
      const mins = offer.time;
      const thisCell = e.target;
      let rowId = +thisCell.dataset.rowId;
      let colId = +thisCell.dataset.colId;
      const nextCell = mins > 30 ? document.getElementById(`cell-${rowId + 1}-${colId}`) : null;
      const nextNextCell = mins > 60 ? document.getElementById(`cell-${rowId + 2}-${colId}`) : null;

      clearSelectedSlots();
      let selectedSlotIds = [];

      if (thisCell.dataset.available === 'true' && thisCell.dataset.booked === 'false') {
        thisCell.classList.add('cell-selected');
        selectedSlotIds.push(+thisCell.dataset.slotId);
        if (nextCell) {
          if (nextCell.dataset.available === 'true' && nextCell.dataset.booked === 'false') {
            nextCell.classList.add('cell-selected');
            selectedSlotIds.push(+nextCell.dataset.slotId);

            if (nextNextCell) {
              if (nextNextCell.dataset.available === 'true' && nextNextCell.dataset.booked === 'false') {
                nextNextCell.classList.add('cell-selected');
                selectedSlotIds.push(+nextNextCell.dataset.slotId);
              }
            }
          }
        }
      }
      setSelectedSlots(collection.filter((item) => selectedSlotIds.includes(item.id)));
    }
  };
  const onHoverSelect = (e) => {
    if (offer && isAuthenticated) {
      const mins = offer.time;
      const thisCell = e.target;
      let rowId = +thisCell.dataset.rowId;
      let colId = +thisCell.dataset.colId;
      const nextCell = mins > 30 ? document.getElementById(`cell-${rowId + 1}-${colId}`) : null;
      const nextNextCell = mins > 60 ? document.getElementById(`cell-${rowId + 2}-${colId}`) : null;
      if (thisCell.dataset.available === 'true' && thisCell.dataset.booked === 'false') {
        thisCell.classList.add('hovered');
        if (nextCell) {
          if (nextCell.dataset.available === 'true' && nextCell.dataset.booked === 'false') {
            nextCell.classList.add('hovered');
            if (nextNextCell) {
              if (nextNextCell.dataset.available === 'true' && nextNextCell.dataset.booked === 'false') {
                nextNextCell.classList.add('hovered');
              } else {
                thisCell.classList.remove('hovered');
                nextCell.classList.remove('hovered');
              }
            }
          } else {
            thisCell.classList.remove('hovered');
          }
        }
      }
    }
  };

  const onHoverDeSelect = (e) => {
    if (offer) {
      const mins = offer.time;
      const thisCell = e.target;
      let rowId = +thisCell.dataset.rowId;
      let colId = +thisCell.dataset.colId;
      const nextCell = mins > 30 ? document.getElementById(`cell-${rowId + 1}-${colId}`) : null;
      const nextNextCell = mins > 60 ? document.getElementById(`cell-${rowId + 2}-${colId}`) : null;
      thisCell.classList.remove('hovered');
      if (nextCell) {
        nextCell.classList.remove('hovered');
        if (nextNextCell) {
          nextNextCell.classList.remove('hovered');
        }
      }
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
                  slotId = slot.id;
                  if (slot.userId) {
                    if (user && slot.userId == user.id) {
                      className = slot.status;
                    }
                  } else {
                    className = slot.status; //always vacant
                  }
                }
                //td slot
                slots.push(
                  <td
                    //ToDo::  onClick={toggleSlotAvailability}
                    id={`cell-${i}-${j}`}
                    onMouseEnter={onHoverSelect}
                    onMouseLeave={onHoverDeSelect}
                    onClick={onSlotSelected}
                    className={className}
                    key={slotMoment.unix()}
                    data-datetime={slotMoment.toISOString()}
                    data-available={isAvailable}
                    data-booked={isBooked}
                    data-slot-id={slotId}
                    data-row-id={i}
                    data-col-id={j}
                  ></td>
                );
              }
            }
            return slots;
          })()}
          <td className='center-align'>{timeMoment.format('HH:mm')}</td>
        </tr>
      );
    }
    return slotSprint;
  };

  return (
    <div id='section-user-calendar' className='section'>
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
      <div className={`fixed-action-btn ${selectedSlots.length > 0 ? '' : 'invisible'}`}>
        <a
          href='#confirm-booking-modal'
          className='btn-floating btn-large teal tooltipped modal-trigger pulse'
          data-position='left'
          data-tooltip='Confirm booking'
        >
          <i className='large material-icons'>check_circle</i>
        </a>
        <ul>
          <li>
            <a
              href='#!'
              className='btn-floating red tooltipped modal-trigger'
              data-position='left'
              data-tooltip='Clear booking'
              onClick={() => {
                clearSelectedSlots();
                clearBooking();
                M.toast({ html: 'Booking cleared.' });
              }}
            >
              <i className='material-icons'>clear</i>
            </a>
          </li>
        </ul>
      </div>
      <ConfirmBookingModal />
    </div>
  );
};

UserCalendar.propTypes = {
  calendarSlots: PropTypes.object.isRequired,
  getCalendar: PropTypes.func.isRequired,
  addSlotToCalendar: PropTypes.func.isRequired,
  setSelectedSlots: PropTypes.func.isRequired,
  clearBooking: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  calendarSlots: state.calendarSlots,
  booking: state.booking,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  getCalendar,
  addSlotToCalendar,
  setDaysOnDisplay,
  setSelectedSlots,
  clearBooking,
})(UserCalendar);
