import {
  GET_LESSONS,
  UPDATE_LESSON,
  LESSON_ERROR,
  SET_LOADING,
  ADD_REQUEST_TO_CALENDAR,
  ACCEPT_BOOK_REQUEST,
} from '../actions/types';

const initialState = {
  collection: [],
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
    case ACCEPT_BOOK_REQUEST:
    case UPDATE_LESSON:
      debugger;
      return {
        ...state,
        collection: state.collection.map((item) => (item.id === action.payload.id ? action.payload : item)),
        loading: false,
      };
    case ADD_REQUEST_TO_CALENDAR:
      return {
        ...state,
        collection: [...state.collection, action.payload],
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
