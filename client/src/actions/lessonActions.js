import { GET_LESSONS, UPDATE_LESSON, LESSON_ERROR, ACCEPT_BOOK_REQUEST, DECLINE_BOOK_REQUEST } from './types';
import { fetchProtected } from './baseActions';

//Get lessons from server
export const getLessonsByUser = (id) => async (dispatch) => {
  try {
    const data = await fetchProtected('/lessons/student');
    dispatch({
      type: GET_LESSONS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LESSON_ERROR,
      payload: error.message,
    });
  }
};

//Get lessons from server
export const getLessons = () => async (dispatch) => {
  try {
    const data = await fetchProtected('/lessons/teacher');
    dispatch({
      type: GET_LESSONS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LESSON_ERROR,
      payload: error.message,
    });
  }
};

//Accept book request
export const acceptBookRequest = (item) => async (dispatch) => {
  try {
    await fetchProtected(`/booking/accept/${item.id}`, 'PATCH');
    item.status = 'upcoming';
    item.slots.forEach((slot) => (slot.status = 'booked'));
    dispatch({
      type: ACCEPT_BOOK_REQUEST,
      payload: item,
    });
  } catch (error) {
    dispatch({
      type: ACCEPT_BOOK_REQUEST,
      payload: error.message,
    });
  }
};

//Decline book request
export const declineBookRequest = (item) => async (dispatch) => {
  try {
    await fetchProtected(`/booking/decline/${item.id}`, 'PATCH');
    item.status = 'canceled';
    item.slots.forEach((slot) => (slot.status = 'blocked'));
    dispatch({
      type: DECLINE_BOOK_REQUEST,
      payload: item,
    });
  } catch (error) {
    dispatch({
      type: DECLINE_BOOK_REQUEST,
      payload: error.message,
    });
  }
};

//Update lesson on server
export const updateLesson = (item) => async (dispatch) => {
  try {
    await fetchProtected(`/lessons/${item.id}`, 'PUT');
    dispatch({
      type: UPDATE_LESSON,
      payload: item,
    });
  } catch (error) {
    dispatch({
      type: LESSON_ERROR,
      payload: error.message,
    });
  }
};
