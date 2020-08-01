import {
  GET_LESSONS,
  ACCEPT_LESSON_REQUEST,
  DECLINE_LESSON_REQUEST,
  ACCEPT_LESSON_RESCHEDULE,
  DECLINE_LESSON_RESCHEDULE,
  LESSON_ERROR,
  SET_LOADING,
} from '../actions/types';

const initialState = {
  collection: null,
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LESSONS:
      return {
        ...state,
        collection: action.payload,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case LESSON_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
