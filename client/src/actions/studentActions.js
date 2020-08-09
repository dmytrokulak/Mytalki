import { GET_STUDENTS, SET_CURRENT_STUDENT, CLEAR_CURRENT_STUDENT, STUDENT_ERROR } from './types';

//Get students from server
export const getStudents = () => async (dispatch) => {
  try {
    const res = await fetch('/users', {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
    const data = await res.json();
    //ToDo:: remove for real back-end
    const lessons = await (
      await fetch('/lessons', {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
    ).json();
    data.forEach((student) => {
      student.lessons = lessons.filter((lesson) => lesson.userId === student.id);
    });
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
