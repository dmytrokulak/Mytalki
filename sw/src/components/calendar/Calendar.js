import React, { useEffect } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCalendar } from '../../actions/calendarActions';

const daysVisible = 7;

const Calendar = ({ calendarSlots: { collection }, getCalendar }) => {
  useEffect(() => {
    getCalendar();
    //eslint-disable-next-line
  }, []);
  return (
    <div id='section-calendar' className='section'>
      <h4 className='center-align'>Calendar</h4>
      <table>
        <thead>
          <tr>
            <th class='center-align'>Time</th>
            {(() => {
              const slots = [];
              for (let i = 0; i < daysVisible; i++) {
                slots.push(
                  <th key={i} class='center-align'>
                    {moment.utc().add(i, 'd').format('ddd, DD MMM')}
                  </th>
                );
              }
              return slots;
            })()}
            <th class='center-align'>
              <label>
                <input type='checkbox' checked='checked' />
                <span>
                  <small> Recurrent</small>
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
                <tr key={timeMoment.minute()}>
                  <td class='center-align'>{timeMoment.format('HH:mm')}</td>
                  {(() => {
                    const slots = [];
                    for (let j = 0; j < daysVisible; j++) {
                      let className = '';
                      if (collection) {
                        const slotMoment = initMoment
                          .clone()
                          .add(j, 'd')
                          .add(timeMoment.hours(), 'h')
                          .add(timeMoment.minutes(), 'm');
                        const slot = collection.find((item) => slotMoment.isSame(moment(item.start), 'm'));
                        if (slot && slot.booked) {
                          className = 'booked';
                        } else if (slot && !slot.booked) {
                          className = 'vacant';
                        }
                      }
                      slots.push(<td className={className} key={(i + 1) * j}></td>);
                    }
                    return slots;
                  })()}
                  <td class='action-cell'>
                    <span class='green-text'>
                      <i className='small material-icons'>add</i>
                    </span>
                    <span class='red-text'>
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
};

const mapStateToProps = (state) => ({
  calendarSlots: state.calendarSlots,
});
export default connect(mapStateToProps, { getCalendar })(Calendar);
