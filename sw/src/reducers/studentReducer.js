import { GET_STUDENTS, SET_CURRENT_STUDENT, CLEAR_CURRENT_STUDENT, STUDENT_ERROR } from '../actions/types';

const initialState = {
  collection: null,
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_STUDENTS:
      return {
        ...state,
        collection: action.payload,
        loading: false,
      };
    case SET_CURRENT_STUDENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT_STUDENT:
      return {
        ...state,
        current: null,
      };
    case STUDENT_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
