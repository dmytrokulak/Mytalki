import { GET_LESSONS, UPDATE_LESSON, LESSON_ERROR } from './types';

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
