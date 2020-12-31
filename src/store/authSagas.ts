import { all, fork, call, put, takeEvery, takeLatest, cancel, getContext, delay } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as actionTypes from "./actionTypes";
import Auth from '@aws-amplify/auth';
import { storeAuthData }   from '../shared/utils';

import { 
  signUpAction,
  signInAction, 
  signOutAction
} from './authActions';

function* signUpSaga (signUpAction) {
  try {
        const response =  yield  Auth.signUp ({
            username: signUpAction.username, 
            password: signUpAction.password,
            attributes: {
              'email': signUpAction.email,
              'custom:first_name': signUpAction.firstname,
              'custom:last_name': signUpAction.lastname
            }
        });
        storeAuthData('username', signUpAction.username);
        storeAuthData('email', signUpAction.email);
        storeAuthData('password', signUpAction.password);
        storeAuthData('firstname', signUpAction.firstname);
        storeAuthData('lastname', signUpAction.lastname);
        yield put({ type : actionTypes.SIGNUP_SUCCESS});
      } catch (err) {
        yield put({ type : actionTypes.SIGNUP_FAILED, errorMsgUp : err.message})
      }
};

function* signInSaga (signInAction) {
      try {
          const response = yield call([Auth,'signIn'], ({ username: signInAction.username, password: signInAction.password }));
          yield storeAuthData('firstname',response.signInUserSession.idToken.payload.['custom:first_name'].toString());
          yield storeAuthData('lastname',response.signInUserSession.idToken.payload.['custom:last_name'].toString());
          yield storeAuthData('token',response.signInUserSession.idToken.jwtToken);
          yield storeAuthData('username',response.username);
          yield storeAuthData('password', signInAction.password);

          yield put({ type : actionTypes.SIGNIN_SUCCESS});
      } catch (err) {
          console.log('err : ', err.message);
          yield put({ type : actionTypes.SIGNIN_FAILED, errorMsgIn : err.message});
      }
};

function* signOutSaga (signOutAction) {
  try {
    yield AsyncStorage.clear();
    yield put({ type : actionTypes.SIGNOUT_SUCCESS});
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

