import { GET_TEACHER_INFO, GET_TEACHER_ERROR } from './types';
import { fetchProtected } from './baseActions';

//Get teacher info for student
export const getTeacherInfo = () => async (dispatch) => {
  try {
    const data = await fetchProtected('/teacher');
    dispatch({
      type: GET_TEACHER_INFO,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_TEACHER_ERROR,
      payload: error.message,
    });
  }
};
