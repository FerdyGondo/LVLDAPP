import { all, fork, call, put, takeEvery, takeLatest, cancel, getContext } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as actionTypes from "./actionTypes";
import { graphqlApiSignIn } from './graphqlApiSignIn';
import { graphqlApiSignUp } from './graphqlApiSignUp';

import { 
  signUpAction,
  signInAction, 
  signOutAction
} from './authActions';

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
    yield AsyncStorage.removeItem('token');
    yield put({ type : actionTypes.SIGNOUT});
  } catch (err) {
      console.log("sagas SIGNOUT err: " , err);
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

