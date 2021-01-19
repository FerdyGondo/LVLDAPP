import { combineReducers } from 'redux';
import contest from './contest';
import auth from '../store/auth';

export default combineReducers({
  contest,
  auth
});
