import { SET_CURRENT_BOOKING } from '../actions/types';

const initialState = {
  lessonType: null,
  offer: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_BOOKING:
      return {
        ...state,
        lessonType: action.payload.lessonType,
        offer: action.payload.offer,
      };
    default:
      return state;
  }
};
