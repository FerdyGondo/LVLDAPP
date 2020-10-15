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

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  website: string;
};

export type Sneaker = {
  id: string;
  name: string;
  nickname: string;
  image: string;
  sizes: [];
};

export type Contest = {
  id: string;
  name: string;
  people: string;
  image: string;
  entry: string;
  start: string;
};

export type UserState = {
  list: User[];
  error?: any;
};

export type SneakerState = {
  sneaker: Sneaker[];
  error?: any;
};

export type State = {
  users: UserState;
  sneakers: SneakerState;
};

