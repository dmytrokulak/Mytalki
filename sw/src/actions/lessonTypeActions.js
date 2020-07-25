import {
  SET_CURRENT,
  CLEAR_CURRENT,
  SET_LOADING,
  GET_LESSON_TYPES,
  ADD_LESSON_TYPE,
  UPDATE_LESSON_TYPE,
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

//Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
