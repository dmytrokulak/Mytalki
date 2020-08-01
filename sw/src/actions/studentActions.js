import { GET_STUDENTS, SET_CURRENT_STUDENT, CLEAR_CURRENT_STUDENT, STUDENT_ERROR } from './types';

//Get students from server
export const getStudents = () => async (dispatch) => {
  try {
    const res = await fetch('/students');
    const data = await res.json();
    dispatch({
      type: GET_STUDENTS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STUDENT_ERROR,
      payload: error,
    });
  }
};

//Set current student
export const setCurrent = (item) => {
  return {
    type: SET_CURRENT_STUDENT,
    payload: item,
  };
};

//Clear current studente
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT_STUDENT,
  };
};
