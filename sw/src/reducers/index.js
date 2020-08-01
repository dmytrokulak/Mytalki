import { combineReducers } from 'redux';
import lessonTypeReducer from './lessonTypeReducer';
import calendarReducer from './calendarReducer';
import scheduleReducer from './scheduleReducer';
import studentRecuder from './studentReducer';
import lessonReducer from './lessonReducer';

export default combineReducers({
  lessonTypes: lessonTypeReducer,
  calendarSlots: calendarReducer,
  savedSchedules: scheduleReducer,
  students: studentRecuder,
  lessons: lessonReducer,
});
