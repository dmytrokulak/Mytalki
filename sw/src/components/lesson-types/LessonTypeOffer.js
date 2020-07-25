import React from 'react';

const LessonTypeOffer = ({ offer }) => {
  return (
    <div className={'card ' + (!offer.onsale && 'grey lighten-2')}>
      <div className='card-content'>
        <table>
          <tbody>
            <tr>
              <td>
                <i className='material-icons'>access_time</i>
              </td>
              <td>{offer.time} mins</td>
            </tr>
            <tr>
              <td>
                <i className='material-icons'>attach_money</i>
              </td>
              <td>
                {offer.price} {offer.currency}
              </td>
            </tr>
            <tr className={offer.active > 0 ? 'teal white-text' : ''}>
              <td>
                <i className='material-icons'>priority_high</i>
              </td>
              <td>{offer.active} Active</td>
            </tr>
            <tr>
              <td>
                <i className='material-icons'>check_circle</i>
              </td>
              <td>{offer.done} Done</td>
            </tr>
          </tbody>
        </table>
        <a href='#!' className={`waves-effect waves-light ${offer.onsale ? 'red' : 'green'}  btn`}>
          {offer.onsale ? 'Suspend' : 'Restore'}
        </a>
      </div>
    </div>
  );
};

export default LessonTypeOffer;
