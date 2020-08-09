import {
  GET_CALENDAR,
  ADD_VACANT_SLOT,
  DELETE_VACANT_SLOT,
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
export const addSlotToCalendar = (item) => async (dispatch) => {
  try {
    const res = await fetch('/calendar-slots', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    });

    const data = await res.json();

    dispatch({
      type: ADD_VACANT_SLOT,
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
export const deleteSlotFromCalendar = (id) => async (dispatch) => {
  try {
    await fetch(`/calendar-slots/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });

    dispatch({
      type: DELETE_VACANT_SLOT,
      payload: id,
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

export const addRequestToCalendar = (items) => async (dispatch) => {
  try {
    const data = [];
    for (let i = 0; i < items.length; i++) {
      const res = await fetch(`/calendar-slots/${items[i].id}`, {
        method: 'PUT',
        body: JSON.stringify(items[i]),
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token'),
        },
      });

      data.push(await res.json());
      dispatch({
        type: ADD_REQUEST_TO_CALENDAR,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: CALENDAR_ERROR,
      payload: error,
    });
  }
};
