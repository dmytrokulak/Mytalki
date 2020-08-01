import {
  GET_LESSONS,
  ACCEPT_LESSON_REQUEST,
  DECLINE_LESSON_REQUEST,
  ACCEPT_LESSON_RESCHEDULE,
  DECLINE_LESSON_RESCHEDULE,
  LESSON_ERROR,
} from './types';

//Get lessons from server
export const getLessons = () => async (dispatch) => {
  try {
    const res = await fetch('/lessons');
    const data = await res.json();
    for (let i = 0; i < data.length; i++) {
      data[i].user = await (await fetch('/students/' + data[i].userId)).json();
      data[i].lessonType = await (await fetch('/lesson-types/' + data[i].lessonTypeId)).json();
      data[i].offer = data[i].lessonType.offers.filter((o) => o.id === data[i].offerId)[0];
    }
    console.log(data);
    dispatch({
      type: GET_LESSONS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LESSON_ERROR,
      payload: error,
    });
  }
};
