import Actions from './actions';
import { ActionObject as Action, ContestState } from './types';

const initialState: ContestState = {
  joinContest: [],
  user: [],
  error: null
};

const contestReducer = (state: ContestState = initialState, action: Action) => {
  switch (action.type) {
    case Actions.contests.joinContest.success.toString():
      return {
        ...state,
        joinContest: action.payload,
        error: null
      };
    case Actions.contests.joinContest.error.toString():
      return {
        ...state,
        error: action.payload
      };
      case Actions.contests.fetchContestUsers.success.toString():
      return {
        ...state,
        user: action.payload,
        error: null
      };
    case Actions.contests.fetchContestUsers.error.toString():
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default contestReducer;