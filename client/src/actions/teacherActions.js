import { GET_TEACHER_INFO } from './types';

//Get teacher info for student
export const getTeacherInfo = () => async (dispatch) => {
  try {
    const res = await fetch('/account');
    const data = await res.json();
    dispatch({
      type: GET_TEACHER_INFO,
      payload: data,
    });
  } catch (error) {
    //   dispatch({
    //     type: LESSON_TYPE_ERROR,
    //     payload: error.message,
    //   });
  }
};
