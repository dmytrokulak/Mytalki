import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const LessonTypeOffer = ({ lessonTypes: { collection }, lessonTypeId, offerId }) => {
  const offer = collection.filter((lt) => lt.id === lessonTypeId)[0].offers.filter((o) => o.id === offerId)[0];
  return (
    <div className={'card ' + (!offer.onSale && 'grey lighten-2')}>
      <div className='card-content'>
        <table>
          <tbody>
            <tr>
              <td>
                <i className='material-icons'>access_time</i>
              </td>
              <td>{offer.minutes} mins</td>
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
                  <i className='red-text material-icons'> priority_high </i>
                ) : (
                  <i className='material-icons'> exposure_zero </i>
                )}
              </td>
              <td>{offer.active ?? 'No'} Active</td>
            </tr>
            <tr>
              <td>
                <i className='material-icons'> {offer.done > 0 ? 'done_all' : 'exposure_zero'} </i>
              </td>
              <td>{offer.done ?? 'No'} Done</td>
            </tr>
            {offer.onSale ? (
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

LessonTypeOffer.propTypes = {
  lessonTypes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  lessonTypes: state.lessonTypes,
});

export default connect(mapStateToProps, {})(LessonTypeOffer);
