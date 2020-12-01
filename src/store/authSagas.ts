import { all, fork, call, put, takeEvery, takeLatest, cancel, getContext } from 'redux-saga/effects';
import * as actionTypes from "./actionTypes";
import { gql } from 'apollo-boost';

import { graphqlApiSignIn } from './graphqlApiSignIn';
import { graphqlApiSignUp } from './graphqlApiSignUp';

import { 
  signUpAction,
  signInAction, 
  signOutAction
} from './authActions';

const LOGIN_QUERY = gql`
    query login($username: String!, $password:String!){
              login(username: $username, password: $password) {
                  accessToken
                  refreshToken
              }
          }
`

function* signUpSaga (signUpAction) {
  try {
        yield (graphqlApiSignUp(signUpAction));
        yield put({ type : actionTypes.SIGNUP_SUCCESS});
      } catch (err) {
        yield put({ type : actionTypes.SIGNUP_FAILED, errorMsgUp : err})
      }
};

function* signInSaga (signInAction) {
      try {
          yield (graphqlApiSignIn(signInAction));
          yield put({ type : actionTypes.SIGNIN_SUCCESS});
      } catch (err) {
          yield put({ type : actionTypes.SIGNIN_FAILED, errorMsgIn : err});
      }
};

function* signOutSaga (signOutAction) {
      try {
      } catch (err) {
          console.log("sagas SIGNOUT err.message: " , err.message);
      }
};

function* watchSignUpSaga() {
  yield takeLatest(actionTypes.REGISTER, signUpSaga);
}
function* watchSignInSaga() {
  yield takeLatest(actionTypes.LOGIN, signInSaga);
}
function* watchSignOutSaga() {
  yield takeLatest(actionTypes.SIGNOUT, signOutSaga);
}

export default function* authSagas() {
    yield fork(watchSignUpSaga);
    yield fork(watchSignInSaga);
    yield fork(watchSignOutSaga);
}

