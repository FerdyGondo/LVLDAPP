import Actions from './actions';
import { ActionObject as Action, ContestState } from './types';

const initialState: ContestState = {
  contest: [],
  error: null
};

const contests = (state: ContestState = initialState, action: Action) => {
  switch (action.type) {
    case Actions.contests.fetchContests.success.toString():
      return {
        ...state,
        contest: action.payload,
        error: null
      };
    case Actions.contests.fetchContests.error.toString():
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default contests;
