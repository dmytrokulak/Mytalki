import { GET_SCHEDULES, SCHEDULE_ERROR, ADD_SCHEDULE, DELETE_SCHEDULE, APPLY_SCHEDULE } from './types';
import { executeProtected } from './baseActions';

//Apply current schedule to the range on display
export const applySchedule = (formData) => async (dispatch) => {
  try {
    const data = await executeProtected('/schedules/apply', 'POST', formData);
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
    const data = await executeProtected('/schedules');
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
    const data = await executeProtected('/schedules/save', 'POST', formData);
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
    await executeProtected(`/schedules/${id}`, 'DELETE');
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
