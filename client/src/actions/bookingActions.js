import {
  SET_CURRENT_BOOKING,
  SET_SELECTED_SLOTS,
  CLEAR_CURRENT_BOOKING,
  ADD_REQUEST_TO_CALENDAR,
  CALENDAR_ERROR,
} from './types';
import { fetchProtected } from './baseActions';

export const addRequestToCalendar = (slotIds, lessonTypeId, offerId) => async (dispatch) => {
  try {
    const data = await fetchProtected('/booking', 'POST', {
      lessonTypeId,
      offerId,
      slotIds,
    });
    dispatch({
      type: ADD_REQUEST_TO_CALENDAR,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CALENDAR_ERROR,
      payload: error.message,
    });
  }
};

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

export const clearBooking = (slots) => (dispatch) => {
  dispatch({
    type: CLEAR_CURRENT_BOOKING,
    payload: slots,
  });
};
