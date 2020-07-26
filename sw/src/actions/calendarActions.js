import { GET_CALENDAR, ADD_VACANT_SLOT, DELETE_VACANT_SLOT, CALENDAR_ERROR } from './types';

//Get calendar from server
export const getCalendar = () => async (dispatch) => {
  try {
    const res = await fetch('/calendar-slots');
    const data = await res.json();
    dispatch({
      type: GET_CALENDAR,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CALENDAR_ERROR,
      payload: error.response.statusText,
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
      payload: error.response.statusText,
    });
  }
};

//Delete vacant slot from calendar
export const deleteSlotFromCalendar = (id) => async (dispatch) => {
  try {
    await fetch(`/calendar-slots/${id}`, {
      method: 'DELETE',
    });

    dispatch({
      type: DELETE_VACANT_SLOT,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: CALENDAR_ERROR,
      payload: error.response.statusText,
    });
  }
};
