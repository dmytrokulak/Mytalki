import {
  SET_CURRENT_LESSON_TYPE,
  CLEAR_CURRENT_LESSON_TYPE,
  SET_LOADING,
  GET_LESSON_TYPES,
  ADD_LESSON_TYPE,
  UPDATE_LESSON_TYPE,
  DELETE_LESSON_TYPE,
  LESSON_TYPE_ERROR,
} from './types';

//Get lesson types from server
export const getLessonTypes = () => async (dispatch) => {
  try {
    setLoading();
    const res = await fetch('/lesson-types', {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
    const data = await res.json();
    dispatch({
      type: GET_LESSON_TYPES,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LESSON_TYPE_ERROR,
      payload: error,
    });
  }
};

//Add lesson type on server
export const addLessonType = (item) => async (dispatch) => {
  try {
    setLoading();

    const res = await fetch(`/lesson-types`, {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    });

    const data = await res.json();

    dispatch({
      type: ADD_LESSON_TYPE,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LESSON_TYPE_ERROR,
      payload: error,
    });
  }
};

//Update lesson type on server
export const updateLessonType = (item) => async (dispatch) => {
  try {
    setLoading();

    await fetch(`/lesson-types/${item.id}`, {
      method: 'PUT',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    });

    dispatch({
      type: UPDATE_LESSON_TYPE,
      payload: item,
    });
  } catch (error) {
    dispatch({
      type: LESSON_TYPE_ERROR,
      payload: error,
    });
  }
  clearCurrent();
};

//Delete lesson type from server
export const deleteLessonType = (id) => async (dispatch) => {
  try {
    setLoading();

    await fetch(`/lesson-types/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });

    dispatch({
      type: DELETE_LESSON_TYPE,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: LESSON_TYPE_ERROR,
      payload: error,
    });
  }
};

//Set current lesson type
export const setCurrent = (item) => {
  return {
    type: SET_CURRENT_LESSON_TYPE,
    payload: item,
  };
};

//Clear current lesson type
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT_LESSON_TYPE,
  };
};

//Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
