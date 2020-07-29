import { GET_SCHEDULES, SCHEDULE_ERROR, ADD_SCHEDULE, DELETE_SCHEDULE } from './types';

//Get schedules from server
const getSavedSchedules = () => async (dispatch) => {
  try {
    const res = await fetch('/schedules');
    const data = await res.json();
    dispatch({
      type: GET_SCHEDULES,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SCHEDULE_ERROR,
      payload: error,
    });
  }
};

//Save schedule to server
const saveSchedule = (item) => async (dispatch) => {
  try {
    const res = await fetch('/schedules', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    dispatch({
      type: ADD_SCHEDULE,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SCHEDULE_ERROR,
      payload: error,
    });
  }
};

//Delete schedule from server
const deleteSchedule = (id) => async (dispatch) => {
  try {
    await fetch(`/schedules/${id}`, {
      method: 'DELETE',
    });

    dispatch({
      type: DELETE_SCHEDULE,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: SCHEDULE_ERROR,
      payload: error,
    });
  }
};
