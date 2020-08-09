import {
  SET_CURRENT_LESSON_TYPE,
  CLEAR_CURRENT_LESSON_TYPE,
  SET_LOADING,
  GET_LESSON_TYPES,
  ADD_LESSON_TYPE,
  DELETE_LESSON_TYPE,
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
        collection: action.payload.sort((a, b) => b.onSale - a.onSale),
        loading: false,
      };
    case ADD_LESSON_TYPE:
      return {
        ...state,
        collection: [...state.collection, action.payload].sort((a, b) => b.onSale - a.onSale),
        loading: false,
      };
    case UPDATE_LESSON_TYPE:
      return {
        ...state,
        collection: state.collection
          .map((item) => (item.id === action.payload.id ? action.payload : item))
          .sort((a, b) => b.onSale - a.onSale),
        loading: false,
      };
    case DELETE_LESSON_TYPE:
      return {
        ...state,
        collection: state.collection.filter((item) => item.id !== action.payload),
        loading: false,
      };
    case SET_CURRENT_LESSON_TYPE:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT_LESSON_TYPE:
      return {
        ...state,
        current: null,
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
