export type Action = (
  payload?: any
) => ActionObject & {
  toString: () => string;
};

export type ActionObject = {
  type: string;
  payload?: any;
};

export type Routine = {
  trigger: Action;
  success: Action;
  error: Action;
};


export type Contest = {
  id: string;
  name: string;
  people: string;
  image: string;
  entry: string;
  start: string;
};

export type JoinContest = {
  id: string;
}

export type JoinContestState = {
  contest: JoinContest [];
  error?: any
}

export type State = {
  joinContest: JoinContestState;
};

