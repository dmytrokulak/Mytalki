import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCalendar } from '../../actions/calendarActions';

const getWeekday = (index) => {
  switch (index) {
    case 0:
      return 'Mon';
    case 1:
      return 'Tue';
    case 2:
      return 'Wed';
    case 3:
      return 'Thu';
    case 4:
      return 'Fri';
    case 5:
      return 'Sat';
    case 6:
      return 'Sun';
    default:
      return 'n/a';
  }
};

const getMonthName = (index) => {
  switch (index) {
    case 0:
      return 'Jan';
    case 1:
      return 'Feb';
    case 2:
      return 'Mar';
    case 3:
      return 'Apr';
    case 4:
      return 'May';
    case 5:
      return 'Jun';
    case 6:
      return 'Jul';
    case 7:
      return 'Aug';
    case 8:
      return 'Sep';
    case 9:
      return 'Oct';
    case 10:
      return 'Nov';
    case 11:
      return 'Dec';
    default:
      return 'n/a';
  }
};
const dayVisible = 7;
const today = new Date();

const formatDate = (date) => {
  return `${getWeekday(date.getDay())}, ${getMonthName(date.getMonth())} ${date.getDate()}`;
};

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
            <th>Time</th>
            {(() => {
              const slots = [];
              let nextDay = new Date();
              for (let i = 0; i < dayVisible; i++) {
                nextDay.setDate(today.getDate() + i);
                slots.push(<th key={i}>{`${formatDate(nextDay)}`}</th>);
              }
              return slots;
            })()}
          </tr>
        </thead>
        <tbody>
          {(() => {
            const slotSprint = [];
            let hours = '00';
            let minutes = '00';
            for (let i = 0; i < 48; i++) {
              hours = (i < 20 ? '0' : '') + Math.floor(i / 2);
              minutes = i % 2 === 0 ? '00' : '30';
              slotSprint.push(
                <tr key={hours + minutes}>
                  <td>{`${hours}:${minutes}`}</td>
                  {(() => {
                    const slots = [];
                    for (let j = 0; j < dayVisible; j++) {
                      let className = '';
                      if (collection) {
                        let date = new Date();
                        date.setDate(today.getDate() + j);
                        date.setHours(+hours, +minutes, 0);
                        const slot = collection.find((item) => {
                          let stored = new Date(item.start);
                          return (
                            stored.getDate() === date.getDate() &&
                            stored.getHours() === date.getHours() &&
                            stored.getMinutes() == date.getMinutes()
                          );
                        });
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
