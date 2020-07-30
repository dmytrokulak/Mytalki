import { combineReducers } from 'redux';
import lessonTypeReducer from './lessonTypeReducer';
import calendarReducer from './calendarReducer';
import scheduleReducer from './scheduleReducer';

export default combineReducers({
  lessonTypes: lessonTypeReducer,
  calendarSlots: calendarReducer,
  savedSchedules: scheduleReducer,
});
