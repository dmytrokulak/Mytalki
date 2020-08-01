import {
  GET_CALENDAR,
  ADD_VACANT_SLOT,
  DELETE_VACANT_SLOT,
  SET_CURRENT,
  CLEAR_CURRENT,
  SET_LOADING,
  CALENDAR_ERROR,
} from '../actions/types';

const initialState = {
  collection: null,
  current: null,
  loading: false,
  error: null,
  daysOnDisplay: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CALENDAR:
      return {
        ...state,
        collection: action.payload,
        loading: false,
      };
    case ADD_VACANT_SLOT:
      return {
        ...state,
        collection: [...state.collection, action.payload],
        loading: false,
      };
    case DELETE_VACANT_SLOT:
      return {
        ...state,
        collection: state.collection.filter((item) => item.id !== action.payload),
        loading: false,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CALENDAR_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
