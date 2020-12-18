import { all, fork, call, put, takeEvery, takeLatest, cancel, getContext } from 'redux-saga/effects';
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
          storeAuthData('token',response.signInUserSession.idToken.jwtToken);
          console.log(response.signInUserSession.accessToken.jwtToken);
          console.log(response.signInUserSession.idToken.jwtToken);
          yield put({ type : actionTypes.SIGNIN_SUCCESS});
      } catch (err) {
          console.log('err : ', err.message);
          yield put({ type : actionTypes.SIGNIN_FAILED, errorMsgIn : err.message});
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
// import { safeSaga } from './actions';
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

