import Actions from './actions';
import { ActionObject as Action, JoinContestState } from './types';

const initialState: JoinContestState = {
  contest: [],
  error: null
};

const joinContest = (state: JoinContestState = initialState, action: Action) => {
  switch (action.type) {
    case Actions.contests.joinContest.success.toString():
      return {
        ...state,
        contest: action.payload,
        error: null
      };
    case Actions.contests.joinContest.error.toString():
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default joinContest;