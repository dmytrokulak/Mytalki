import React from 'react';

const Calendar = () => {
  return (
    <div id='section-calendar' class='section'>
      <h4 class='center-align'>Calendar</h4>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Fri 24</th>
            <th>Sat 25</th>
            <th>Sun 26</th>
            <th>Mon 27</th>
            <th>Tue 28</th>
            <th>Wed 29</th>
            <th>Thu 30</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>00:00</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>00:30</td>
            <td class='vacant'></td>
            <td class='vacant'></td>
            <td class='vacant'></td>
            <td class='vacant'></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>01:00</td>
            <td class='vacant'></td>
            <td class='vacant'></td>
            <td class='booked'></td>
            <td class='vacant'></td>
            <td class='requested'></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>01:30</td>
            <td></td>
            <td></td>
            <td class='booked-first-half'></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>02:00</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>02:30</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>03:00</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>03:30</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>04:00</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>04:30</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
