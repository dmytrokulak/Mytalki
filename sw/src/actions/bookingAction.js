import { SET_CURRENT_BOOKING, SET_SELECTED_SLOTS } from './types';

export const setCurrentBooking = (item) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_BOOKING,
    payload: item,
  });
};

export const setSelectedSlots = (slots) => (dispatch) => {
  dispatch({
    type: SET_SELECTED_SLOTS,
    payload: slots,
  });
};
