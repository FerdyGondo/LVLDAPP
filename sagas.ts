import { all, fork, call, put, takeEvery } from 'redux-saga/effects';

import Actions from './actions';

function* fetchUsers({ payload }) {
  try {
    const resp = yield call(
      fetch,
      'https://jsonplaceholder.typicode.com/users'
    );
    const users = yield resp.json();
    yield put(Actions.users.fetchUsers.success(users));
  } catch (e) {
    yield put(Actions.users.fetchUsers.error(e));
    console.error(e);
  }
}

function* fetchSneakers({ payload }) {
  try {
    const resp = yield call(
      fetch,
      'https://5f7f7428d6aabe00166f051c.mockapi.io/api/v1/sneakers'
    );
    const sneakers = yield resp.json();
    yield put(Actions.sneakers.fetchSneakers.success(sneakers));
  } catch (e) {
    yield put(Actions.sneakers.fetchSneakers.error(e));
    console.error(e);
  }
}

function* fetchContests({ payload }) {
  try {
    const resp = yield call(
      fetch,
      'https://5f7f7428d6aabe00166f051c.mockapi.io/api/v1/contest'
    );
    const contests = yield resp.json();
    yield put(Actions.contests.fetchContests.success(contests));
  } catch (e) {
    yield put(Actions.contests.fetchContests.error(e));
    console.error(e);
  }
}

function* userSagas() {
  yield takeEvery(Actions.users.fetchUsers.trigger, fetchUsers);
}

function* sneakerSagas() {
  yield takeEvery(Actions.sneakers.fetchSneakers.trigger, fetchSneakers);
}

function* contestsSaga() {
  yield takeEvery(Actions.contests.fetchContests.trigger, fetchContests);
}

export default function* sagas() {
  yield all([fork(userSagas)]);
  yield all([fork(sneakerSagas)]);
  yield all([fork(contestsSaga)])
}
