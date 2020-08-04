import { SET_CURRENT_BOOKING, CLEAR_CURRENT_BOOKING, SET_SELECTED_SLOTS } from '../actions/types';

const initialState = {
  lessonType: null,
  offer: null,
  selectedSlots: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_BOOKING:
      return {
        ...state,
        lessonType: action.payload.lessonType,
        offer: action.payload.offer,
      };
    case CLEAR_CURRENT_BOOKING:
      return {
        ...state,
        lessonType: null,
        offer: null,
        selectedSlots: [],
      };
    case SET_SELECTED_SLOTS:
      return {
        ...state,
        selectedSlots: action.payload,
      };
    default:
      return state;
  }
};
