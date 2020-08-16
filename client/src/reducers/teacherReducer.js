import { GET_TEACHER_INFO, GET_TEACHER_ERROR } from '../actions/types';

const initialState = {
  firstName: null,
  lastName: null,
  communication: [],
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TEACHER_INFO:
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        communication: action.payload.communication,
        error: null,
      };
    case GET_TEACHER_ERROR:
      return {
        ...state,
        firstName: null,
        lastName: null,
        communication: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
