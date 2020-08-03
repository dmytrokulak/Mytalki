import { GET_TEACHER_INFO } from '../actions/types';

const initialState = {
  firstName: null,
  lastName: null,
  communication: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TEACHER_INFO:
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        communication: action.payload.communication,
      };
    default:
      return state;
  }
};
