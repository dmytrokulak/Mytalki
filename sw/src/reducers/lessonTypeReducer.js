import {
  SET_CURRENT,
  CLEAR_CURRENT,
  SET_LOADING,
  GET_LESSON_TYPES,
  ADD_LESSON_TYPE,
  UPDATE_LESSON_TYPE,
  LESSON_TYPE_ERROR,
} from '../actions/types';

const initialState = {
  collection: null,
  current: null,
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LESSON_TYPES:
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
    case LESSON_TYPE_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
