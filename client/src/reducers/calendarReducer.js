import {
  GET_CALENDAR,
  ADD_VACANT_SLOTS,
  DELETE_VACANT_SLOTS,
  SET_LOADING,
  CALENDAR_ERROR,
  SET_DAYS_ON_DISPLAY,
  ADD_REQUEST_TO_CALENDAR,
  ACCEPT_BOOK_REQUEST,
} from '../actions/types';

const initialState = {
  collection: [],
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
    case ACCEPT_BOOK_REQUEST:
      debugger;
      return {
        ...state,
        collection: state.collection.map((item) => {
          const updated = action.payload.filter((slot) => slot.id === item.id);
          return updated ? updated[0] : item;
        }),
      };
    default:
      return state;
  }
};
