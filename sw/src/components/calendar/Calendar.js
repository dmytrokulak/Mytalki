import React, { useEffect } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';
import { getCalendar, addSlotToCalendar, deleteSlotFromCalendar } from '../../actions/calendarActions';

const daysVisible = 7;

const Calendar = ({ calendarSlots: { collection }, getCalendar, addSlotToCalendar, deleteSlotFromCalendar }) => {
  useEffect(() => {
    getCalendar();
    //eslint-disable-next-line
  }, []);

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
        booked: false,
      });
    }
  };

  return (
    <div id='section-calendar' className='section'>
      <h4 className='center-align'>Calendar</h4>
      <table>
        <thead>
          <tr>
            <th className='center-align'>Time</th>
            {(() => {
              const slots = [];
              for (let i = 0; i < daysVisible; i++) {
                slots.push(
                  <th key={i} className='center-align'>
                    {moment.utc().add(i, 'd').format('ddd, DD MMM')}
                  </th>
                );
              }
              return slots;
            })()}
            <th className='center-align'>
              <label>
                <input
                  onChange={() => {
                    console.log('checkbox clicked');
                  }}
                  type='checkbox'
                  checked='checked'
                />
                <span>
                  <small>Recurrent</small>
                </span>
              </label>
            </th>
          </tr>
        </thead>
        <tbody>
          {(() => {
            const slotSprint = [];
            const initMoment = new moment.utc().hours(0).minutes(0).seconds(0);
            for (let i = 0; i < 24 * 2; i++) {
              let timeMoment = initMoment.clone();
              timeMoment.add(Math.floor(i / 2), 'h').add((i % 2) * 30, 'm');
              slotSprint.push(
                <tr key={timeMoment.unix()}>
                  <td className='center-align'>{timeMoment.format('HH:mm')}</td>
                  {(() => {
                    const slots = [];
                    for (let j = 0; j < daysVisible; j++) {
                      if (collection) {
                        const slotMoment = initMoment
                          .clone()
                          .add(j, 'd')
                          .add(timeMoment.hours(), 'h')
                          .add(timeMoment.minutes(), 'm');
                        const slot = collection.find((item) => slotMoment.isSame(moment(item.start), 'm'));
                        let className = '';
                        let isAvailable = false;
                        let isBooked = false;
                        let slotId = 0;
                        if (slot) {
                          isAvailable = true;
                          isBooked = slot.booked;
                          className = slot.booked ? 'booked' : 'vacant';
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
                  <td className='action-cell'>
                    <span className='green-text'>
                      <i className='small material-icons'>add</i>
                    </span>
                    <span className='red-text'>
                      <i className='small material-icons'>remove</i>
                    </span>
                  </td>
                </tr>
              );
            }
            return slotSprint;
          })()}
        </tbody>
      </table>
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
export default connect(mapStateToProps, { getCalendar, addSlotToCalendar, deleteSlotFromCalendar })(Calendar);
