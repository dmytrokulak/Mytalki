import { combineReducers } from 'redux';
import lessonTypeReducer from './lessonTypeReducer';
import calendarReducer from './calendarReducer';
import scheduleReducer from './scheduleReducer';
import studentRecuder from './studentReducer';
import lessonReducer from './lessonReducer';
import authReducer from './authReducer';
import bookingReducer from './bookingReducer';
import teacherReducer from './teacherReducer';
import systemReducer from './systemReducer';

export default combineReducers({
  lessonTypes: lessonTypeReducer,
  calendarSlots: calendarReducer,
  savedSchedules: scheduleReducer,
  students: studentRecuder,
  lessons: lessonReducer,
  auth: authReducer,
  booking: bookingReducer,
  teacher: teacherReducer,
  system: systemReducer,
});
