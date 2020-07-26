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
            <tr>
              <td>
                {offer.active > 0 ? (
                  <i className='teal-text material-icons'> priority_high </i>
                ) : (
                  <i className='material-icons'> exposure_zero </i>
                )}
              </td>
              <td>{offer.active} Active</td>
            </tr>
            <tr>
              <td>
                <i className='material-icons'>done_all</i>
              </td>
              <td>{offer.done} Done</td>
            </tr>
            {offer.onsale ? (
              <tr>
                <td>
                  <i className='green-text material-icons'>check_circle</i>
                </td>
                <td>On sale</td>
              </tr>
            ) : (
              <tr>
                <td>
                  <i className='red-text material-icons'>cancel</i>
                </td>
                <td>Suspended</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LessonTypeOffer;
