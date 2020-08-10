import {
  GET_CALENDAR,
  ADD_VACANT_SLOTS,
  DELETE_VACANT_SLOTS,
  SET_LOADING,
  CALENDAR_ERROR,
  SET_DAYS_ON_DISPLAY,
  ADD_REQUEST_TO_CALENDAR,
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
    case ADD_VACANT_SLOTS:
      return {
        ...state,
        collection: [...state.collection, ...action.payload],
        loading: false,
      };
    case DELETE_VACANT_SLOTS:
      return {
        ...state,
        collection: state.collection.filter((item) => !action.payload.includes(item.id)),
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
    case ADD_REQUEST_TO_CALENDAR:
      for (let i = 0; i < action.payload.length; i++) {
        let requested = state.collection.filter((item) => item.id === action.payload[i]);
        requested.status = 'book-request';
      }
      return {
        ...state,
        collection: state.collection,
      };
    default:
      return state;
  }
};
