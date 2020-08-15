import {
  SET_CURRENT_LESSON_TYPE,
  CLEAR_CURRENT_LESSON_TYPE,
  SET_LOADING_LESSON_TYPE,
  GET_LESSON_TYPES,
  ADD_LESSON_TYPE,
  UPDATE_LESSON_TYPE,
  DELETE_LESSON_TYPE,
  LESSON_TYPE_ERROR,
} from './types';
import { executeProtected } from './baseActions';

//Get lesson types from server
export const getLessonTypes = () => async (dispatch) => {
  try {
    setLoading();
    const data = await executeProtected('/lesson-types');
    dispatch({
      type: GET_LESSON_TYPES,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LESSON_TYPE_ERROR,
      payload: error.message,
    });
  }
};

//Add lesson type on server
export const addLessonType = (item) => async (dispatch) => {
  try {
    setLoading();
    const data = await executeProtected(`/lesson-types`, 'POST', item);
    dispatch({
      type: ADD_LESSON_TYPE,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LESSON_TYPE_ERROR,
      payload: error.message,
    });
  }
};

//Update lesson type on server
export const updateLessonType = (item) => async (dispatch) => {
  try {
    setLoading();
    await executeProtected(`/lesson-types/${item.id}`, 'PUT', item);
    dispatch({
      type: UPDATE_LESSON_TYPE,
      payload: item,
    });
  } catch (error) {
    dispatch({
      type: LESSON_TYPE_ERROR,
      payload: error.message,
    });
  }
  clearCurrent();
};

//Suspend lesson type
export const suspendLessonType = (item) => async (dispatch) => {
  try {
    setLoading();
    await executeProtected(`/lesson-types/${item.id}/suspend`, 'PATCH');
    item.onSale = false;
    dispatch({
      type: UPDATE_LESSON_TYPE,
      payload: item,
    });
  } catch (error) {
    dispatch({
      type: LESSON_TYPE_ERROR,
      payload: error.message,
    });
  }
};

//Restore lesson type
export const restoreLessonType = (item) => async (dispatch) => {
  try {
    setLoading();
    await executeProtected(`/lesson-types/${item.id}/restore`, 'PATCH');
    item.onSale = true;
    dispatch({
      type: UPDATE_LESSON_TYPE,
      payload: item,
    });
  } catch (error) {
    dispatch({
      type: LESSON_TYPE_ERROR,
      payload: error.message,
    });
  }
};

//Delete lesson type from server
export const deleteLessonType = (id) => async (dispatch) => {
  try {
    setLoading();
    await executeProtected(`/lesson-types/${id}`, 'DELETE');
    dispatch({
      type: DELETE_LESSON_TYPE,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: LESSON_TYPE_ERROR,
      payload: error.message,
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
    type: SET_LOADING_LESSON_TYPE,
  };
};
