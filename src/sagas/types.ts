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


export type JoinContest = {
  id: string;
}

export type ContestUser = {
  username: string;
}

export type ContestState = {
  joinContest: JoinContest [];
  user: ContestUser[];
  error?: any;
}

export type State = {
  contest: ContestState;
};

