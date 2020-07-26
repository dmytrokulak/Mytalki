import { combineReducers } from 'redux';
import lessonTypeReducer from './lessonTypeReducer';
import calendarReducer from './calendarReducer';

export default combineReducers({
  lessonTypes: lessonTypeReducer,
  calendarSlots: calendarReducer,
});
