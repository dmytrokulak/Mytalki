import {
  GET_CALENDAR,
  ADD_VACANT_SLOTS,
  DELETE_VACANT_SLOTS,
  CALENDAR_ERROR,
  SET_DAYS_ON_DISPLAY,
  ADD_REQUEST_TO_CALENDAR,
} from './types';

//Get calendar from server
export const getCalendar = () => async (dispatch) => {
  try {
    const res = await fetch('/calendar-slots', {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
    const data = await res.json();
    dispatch({
      type: GET_CALENDAR,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CALENDAR_ERROR,
      payload: error,
    });
  }
};

//Add vacant slot to calendar
export const addSlotsToCalendar = (items) => async (dispatch) => {
  try {
    const res = await fetch('/calendar-slots', {
      method: 'POST',
      body: JSON.stringify(items),
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    });

    const data = await res.json();
    dispatch({
      type: ADD_VACANT_SLOTS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CALENDAR_ERROR,
      payload: error,
    });
  }
};

//Delete vacant slot from calendar
export const deleteSlotsFromCalendar = (ids) => async (dispatch) => {
  try {
    await fetch(`/calendar-slots`, {
      method: 'DELETE',
      body: JSON.stringify(ids),
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    });

    dispatch({
      type: DELETE_VACANT_SLOTS,
      payload: ids,
    });
  } catch (error) {
    dispatch({
      type: CALENDAR_ERROR,
      payload: error,
    });
  }
};

export const setDaysOnDisplay = (days) => (dispatch) => {
  dispatch({
    type: SET_DAYS_ON_DISPLAY,
    payload: days,
  });
};

export const addRequestToCalendar = (slotIds, lessonTypeId) => async (dispatch) => {
  try {
    var res = await fetch(`/booking`, {
      method: 'POST',
      body: JSON.stringify({
        lessonTypeId,
        slotIds,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    });
    var data = await res.json();
    dispatch({
      type: ADD_REQUEST_TO_CALENDAR,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CALENDAR_ERROR,
      payload: error,
    });
  }
};
