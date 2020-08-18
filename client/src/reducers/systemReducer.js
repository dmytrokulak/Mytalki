import { GET_TIMEZONES, TIMEZONES_ERROR } from '../actions/types';

const initialState = {
  timezones: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TIMEZONES:
      return {
        ...state,
        timezones: action.payload,
        error: null,
      };
    case TIMEZONES_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
