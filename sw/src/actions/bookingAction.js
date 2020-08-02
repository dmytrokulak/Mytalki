import { SET_CURRENT_BOOKING } from './types';

export const setCurrentBooking = (item) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_BOOKING,
    payload: item,
  });
};
