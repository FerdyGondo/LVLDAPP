import { combineReducers } from 'redux';
import users from './users';
import sneakers from './sneakers'
import contests from './contests'

export default combineReducers({
  users,
  sneakers,
  contests
});
