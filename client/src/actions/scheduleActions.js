import { GET_SCHEDULES, SCHEDULE_ERROR, ADD_SCHEDULE, DELETE_SCHEDULE, APPLY_SCHEDULE } from './types';
import { fetchProtected } from './baseActions';

//Apply current schedule to the range on display
export const applySchedule = (formData) => async (dispatch) => {
  try {
    const data = await fetchProtected('/schedules/apply', 'POST', formData);
    dispatch({
      type: APPLY_SCHEDULE,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SCHEDULE_ERROR,
      payload: error.message,
    });
  }
};

//Get schedules from server
export const getSavedSchedules = () => async (dispatch) => {
  try {
    const data = await fetchProtected('/schedules');
    dispatch({
      type: GET_SCHEDULES,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SCHEDULE_ERROR,
      payload: error.message,
    });
  }
};

//Save schedule to server
export const saveSchedule = (formData) => async (dispatch) => {
  try {
    const data = await fetchProtected('/schedules/save', 'POST', formData);
    dispatch({
      type: ADD_SCHEDULE,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SCHEDULE_ERROR,
      payload: error.message,
    });
  }
};

//Delete schedule from server
export const deleteSchedule = (id) => async (dispatch) => {
  try {
    await fetchProtected(`/schedules/${id}`, 'DELETE');
    dispatch({
      type: DELETE_SCHEDULE,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: SCHEDULE_ERROR,
      payload: error.message,
    });
  }
};
