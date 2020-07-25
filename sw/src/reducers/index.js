import { combineReducers } from 'redux';
import lessonTypeReducer from './lessonTypeReducer';

export default combineReducers({
  lessonTypes: lessonTypeReducer,
});
