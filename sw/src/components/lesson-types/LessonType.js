import React from 'react';

const LessonType = () => {
  return (
    <li>
      <div className='collapsible-header'>
        <h5>
          <i className='material-icons'>details</i>Chinese for beginners
        </h5>
        <span>
          <span className='badge' data-badge-caption='Total'>
            12
          </span>
          <span className='new badge' data-badge-caption='Active'>
            2
          </span>
        </span>
      </div>
      <div className='collapsible-body'>
        <blockquote>
          Suitable for those just starting to learn the language. Will help you take speed and gain confidence. Lorem
          ipsum dolor sit, amet consectetur adipisicing elit. Illum illo ab provident rem sed est alias non tenetur
          corrupti adipisci!
        </blockquote>
        <div className='row'>
          <div className=' col l3'>
            <div className='card'>
              <div className='card-content'>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <i className='material-icons'>access_time</i>
                      </td>
                      <td>30 mins</td>
                    </tr>
                    <tr>
                      <td>
                        <i className='material-icons'>attach_money</i>
                      </td>
                      <td>5 USD</td>
                    </tr>
                    <tr className='teal white-text'>
                      <td>
                        <i className='material-icons'>priority_high</i>
                      </td>
                      <td>1 Active</td>
                    </tr>
                    <tr>
                      <td>
                        <i className='material-icons'>check_circle</i>
                      </td>
                      <td>6 Done</td>
                    </tr>
                  </tbody>
                </table>
                <a className='waves-effect waves-light red btn'>Suspend</a>
              </div>
            </div>
          </div>
          <div className='col l3'>
            <div className='card'>
              <div className='card-content'>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <i className='material-icons'>access_time</i>
                      </td>
                      <td>45 mins</td>
                    </tr>
                    <tr>
                      <td>
                        <i className='material-icons'>attach_money</i>
                      </td>
                      <td>7 USD</td>
                    </tr>
                    <tr>
                      <td>
                        <i className='material-icons'>exposure_zero</i>
                      </td>
                      <td>No Active</td>
                    </tr>
                    <tr>
                      <td>
                        <i className='material-icons'>check_circle</i>
                      </td>
                      <td>1 Done</td>
                    </tr>
                  </tbody>
                </table>
                <a className='waves-effect waves-light red btn'>Suspend</a>
              </div>
            </div>
          </div>
          <div className='col l3'>
            <div className='card '>
              <div className='card-content'>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <i className='material-icons'>access_time</i>
                      </td>
                      <td>60 mins</td>
                    </tr>
                    <tr>
                      <td>
                        <i className='material-icons'>attach_money</i>
                      </td>
                      <td>10 USD</td>
                    </tr>
                    <tr className='teal white-text'>
                      <td>
                        <i className='material-icons'>priority_high</i>
                      </td>
                      <td>1 Active</td>
                    </tr>
                    <tr>
                      <td>
                        <i className='material-icons'>check_circle</i>
                      </td>
                      <td>5 Done</td>
                    </tr>
                  </tbody>
                </table>

                <a className='waves-effect waves-light red btn'>Suspend</a>
              </div>
            </div>
          </div>
          <div className='col l3'>
            <div className='card grey lighten-2'>
              <div className='card-content'>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <i className='material-icons'>access_time</i>
                      </td>
                      <td>90 mins</td>
                    </tr>
                    <tr>
                      <td>
                        <i className='material-icons'>attach_money</i>
                      </td>
                      <td>15 USD</td>
                    </tr>
                    <tr>
                      <td>
                        <i className='material-icons'>exposure_zero</i>
                      </td>
                      <td>No Active</td>
                    </tr>
                    <tr>
                      <td>
                        <i className='material-icons'>exposure_zero</i>
                      </td>
                      <td>No Done</td>
                    </tr>
                  </tbody>
                </table>

                <a className='waves-effect waves-light green btn'>Restore</a>
              </div>
            </div>
          </div>
        </div>
        <div className='lesson-type-actions'>
          <a className='waves-effect waves-light red btn right'>Suspend</a>
          <a href='#lesson-type-modal' className='waves-effect waves-light blue btn right modal-trigger'>
            Change
          </a>
          <div className='clearfix'></div>
        </div>
      </div>
    </li>
  );
};

export default LessonType;
