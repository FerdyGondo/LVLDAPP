import { combineReducers } from 'redux';
import users from './users';
import sneakers from './sneakers'
import auth from './src/store/auth';

export default combineReducers({
  users,
  sneakers,
  auth
});
