import {
  GET_CALENDAR,
  ADD_VACANT_SLOTS,
  DELETE_VACANT_SLOTS,
  CALENDAR_ERROR,
  SET_DAYS_ON_DISPLAY,
  SET_LOADING_CALENDAR,
} from './types';
import { executeProtected } from './baseActions';

//Get calendar from server
export const getCalendar = () => async (dispatch) => {
  setLoading();
  try {
    const data = await executeProtected('/calendar-slots');
    dispatch({
      type: GET_CALENDAR,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CALENDAR_ERROR,
      payload: error.message,
    });
  }
};

//Add vacant slots to calendar
export const addSlotsToCalendar = (items) => async (dispatch) => {
  setLoading();
  try {
    const data = await executeProtected('/calendar-slots', 'POST', items);
    dispatch({
      type: ADD_VACANT_SLOTS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CALENDAR_ERROR,
      payload: error.message,
    });
  }
};

//Delete vacant slots from calendar
export const deleteSlotsFromCalendar = (ids) => async (dispatch) => {
  setLoading();
  try {
    await executeProtected('/calendar-slots', 'DELETE', ids);
    dispatch({
      type: DELETE_VACANT_SLOTS,
      payload: ids,
    });
  } catch (error) {
    dispatch({
      type: CALENDAR_ERROR,
      payload: error.message,
    });
  }
};

//Set days to be currently displayed on the screen
export const setDaysOnDisplay = (days) => (dispatch) => {
  dispatch({
    type: SET_DAYS_ON_DISPLAY,
    payload: days,
  });
};

//Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING_CALENDAR,
  };
};
