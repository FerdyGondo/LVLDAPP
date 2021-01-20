import { all, fork, call, put, takeEvery } from 'redux-saga/effects';
import { joinContest, getContestUsers } from '../graphql/contest'

import Actions from './actions';

function* joinContests({ payload }) {
  try {
    const contests = yield joinContest(payload._id, payload.totalCredits);
    yield put(Actions.contests.joinContest.success(contests));
  } catch (e) {
    yield put(Actions.contests.joinContest.error(e));
    console.error(e);
  }
}

function* fetchContestUsers({ payload }) {
  try {
    const contestUsers = yield getContestUsers(payload._id);
    console.log('contestUsers', contestUsers)
    yield put(Actions.contests.fetchContestUsers.success(contestUsers));
  } catch (e) {
    yield put(Actions.contests.fetchContestUsers.error(e));
    console.error(e);
  }
}

function* contestSagas() {
  yield takeEvery(Actions.contests.joinContest.trigger, joinContests);
}

function* contestUserSagas() {
  yield takeEvery(Actions.contests.fetchContestUsers.trigger, fetchContestUsers);
}


export default function* sagas() {
  yield all([fork(contestSagas)])
  yield all([fork(contestUserSagas)])
}
