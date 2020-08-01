import {
  GET_CALENDAR,
  ADD_VACANT_SLOT,
  DELETE_VACANT_SLOT,
  SET_LOADING,
  CALENDAR_ERROR,
  SET_DAYS_ON_DISPLAY,
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
    case SET_DAYS_ON_DISPLAY:
      return {
        ...state,
        daysOnDisplay: action.payload,
      };
    default:
      return state;
  }
};
