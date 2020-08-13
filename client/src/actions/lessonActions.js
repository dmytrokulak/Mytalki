import { GET_LESSONS, UPDATE_LESSON, LESSON_ERROR, ACCEPT_BOOK_REQUEST, DECLINE_BOOK_REQUEST } from './types';

//Get lessons from server
export const getLessonsByUser = (id) => async (dispatch) => {
  try {
    const res = await fetch('/lessons/student', {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
    const data = await res.json();
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

//Get lessons from server
export const getLessons = () => async (dispatch) => {
  try {
    const res = await fetch('/lessons/teacher', {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
    const data = await res.json();
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

//Accept book request
export const acceptBookRequest = (item) => async (dispatch) => {
  try {
    await fetch(`/booking/accept/${item.id}`, {
      method: 'PATCH',
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });

    item.status = 'upcoming';
    item.slots.forEach((slot) => (slot.status = 'booked'));
    dispatch({
      type: ACCEPT_BOOK_REQUEST,
      payload: item,
    });
  } catch (error) {
    dispatch({
      type: ACCEPT_BOOK_REQUEST,
      payload: error,
    });
  }
};

//Decline book request
export const declineBookRequest = (item) => async (dispatch) => {
  try {
    await fetch(`/booking/decline/${item.id}`, {
      method: 'PATCH',
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });

    item.status = 'canceled';
    item.slots.forEach((slot) => (slot.status = 'blocked'));
    dispatch({
      type: DECLINE_BOOK_REQUEST,
      payload: item,
    });
  } catch (error) {
    dispatch({
      type: DECLINE_BOOK_REQUEST,
      payload: error,
    });
  }
};

//Update lesson on server
export const updateLesson = (item) => async (dispatch) => {
  try {
    const res = await fetch(`/lessons/${item.id}`, {
      method: 'PUT',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();

    dispatch({
      type: UPDATE_LESSON,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LESSON_ERROR,
      payload: error,
    });
  }
};
