import React from 'react';

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

const formatDate = (date) => {
  return `${getWeekday(date.getDay())}, ${getMonthName(date.getMonth())} ${date.getDate()}`;
};
const dayVisible = 7;
const Calendar = () => {
  return (
    <div id='section-calendar' className='section'>
      <h4 className='center-align'>Calendar</h4>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            {(() => {
              const slots = [];
              const today = new Date();
              let nextDay = new Date();
              for (let i = 0; i < dayVisible; i++) {
                nextDay.setDate(today.getDate() + i);
                slots.push(<th>{`${formatDate(nextDay)}`}</th>);
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
                <tr>
                  <td>{`${hours}:${minutes}`}</td>
                  {(() => {
                    const slots = [];
                    for (let i = 0; i < dayVisible; i++) {
                      slots.push(<td></td>);
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

export default Calendar;
