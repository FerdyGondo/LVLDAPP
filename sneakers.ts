import Actions from './actions';
import { ActionObject as Action, SneakerState } from './types';

const initialState: SneakerState = {
  sneaker: [],
  error: null
};

const sneakers = (state: SneakerState = initialState, action: Action) => {
  switch (action.type) {
    case Actions.sneakers.fetchSneakers.success.toString():
      return {
        ...state,
        sneaker: action.payload,
        error: null
      };
    case Actions.sneakers.fetchSneakers.error.toString():
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default sneakers;
