import { GET_SCHEDULES, SCHEDULE_ERROR, ADD_SCHEDULE, DELETE_SCHEDULE } from './types';
//ToDo:: next line should be removed
import { addSlotToCalendar } from './calendarActions';
import moment from 'moment';

//Apply current schedule to the range on display
export const applySchedule = (schedule, daysOnDisplay) => async (dispatch) => {
  try {
    //ToDo:: this all should be on back end
    //daysOnDisplay.sort((a, b) => a.weekday() - b.weekday());

    for (let i = 0; i < 7; i++) {
      let slots = schedule.days[i].slots;
      slots.forEach((slot) => {
        setTimeout(() => {
          const savedSlot = new moment.utc(slot.start);
          let newSlot = daysOnDisplay[i].clone();
          newSlot.hours(savedSlot.hours()).valueOf();
          newSlot.minutes(savedSlot.minutes()).valueOf();
          addSlotToCalendar(newSlot);
        }, 1000);
      });
    }
  } catch (error) {
    dispatch({
      type: SCHEDULE_ERROR,
      payload: error,
    });
  }
};

//Get schedules from server
export const getSavedSchedules = () => async (dispatch) => {
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
export const saveSchedule = (item) => async (dispatch) => {
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
export const deleteSchedule = (id) => async (dispatch) => {
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