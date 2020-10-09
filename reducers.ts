import { combineReducers } from 'redux';
import users from './users';
import sneakers from './sneakers'

export default combineReducers({
  users,
  sneakers
});
