import {
  SET_CURRENT,
  CLEAR_CURRENT,
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
    const res = await fetch('/lesson-types');
    const data = await res.json();
    dispatch({
      type: GET_LESSON_TYPES,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LESSON_TYPE_ERROR,
      payload: error.response.statusText,
    });
  }
};

//Add lesson type on server
export const addLessonType = (item) => async (dispatch) => {
  try {
    setLoading();

    const res = await fetch(`/lesson-type`, {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
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
      payload: error.response.statusText,
    });
  }
};

//Delete lesson type from server
export const deleteLessonType = (id) => async (dispatch) => {
  try {
    setLoading();

    await fetch(`/lesson-type/${id}`, {
      method: 'DELETE',
    });

    dispatch({
      type: DELETE_LESSON_TYPE,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: LESSON_TYPE_ERROR,
      payload: error.response.statusText,
    });
  }
};

//Update lesson type on server
export const updateLessonType = (item) => async (dispatch) => {
  try {
    setLoading();

    const res = await fetch(`/lesson-type/${item.id}`, {
      method: 'PUT',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();

    dispatch({
      type: UPDATE_LESSON_TYPE,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LESSON_TYPE_ERROR,
      payload: error.response.statusText,
    });
  }
};

//Set current lesson type
export const setCurrent = (item) => {
  return {
    type: SET_CURRENT,
    payload: item,
  };
};

//Clear current lesson type
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT,
  };
};

//Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
