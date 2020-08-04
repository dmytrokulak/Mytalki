import { GET_SCHEDULES, SCHEDULE_ERROR, ADD_SCHEDULE, DELETE_SCHEDULE } from '../actions/types';

const initialState = {
  collection: null,
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SCHEDULES:
      return {
        ...state,
        collection: action.payload,
        loading: false,
      };
    case ADD_SCHEDULE:
      return {
        ...state,
        collection: [...state, action.payload],
        loading: false,
      };
    case DELETE_SCHEDULE:
      return {
        ...state,
        collection: state.collection.filter((item) => item.id !== action.payload),
        loading: false,
      };
    case SCHEDULE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
