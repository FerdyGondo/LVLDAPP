import { all, fork, call, put, takeEvery, takeLatest, cancel, getContext, delay } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as actionTypes from "./actionTypes";
import Auth from '@aws-amplify/auth';
import { storeAuthData }   from '../shared/utils';
import { getUser } from './getUser'
import { 
  signUpAction,
  signInAction, 
  signOutAction,
  getUserAction
} from './authActions';

function* signUpSaga (signUpAction) {
  try {
        const response =  yield  Auth.signUp ({
            username: signUpAction.username, 
            password: signUpAction.password,
            attributes: {
              'email': signUpAction.email,
              'given_name': signUpAction.firstname,
              'family_name': signUpAction.lastname
            }
        });
        storeAuthData('username', signUpAction.username);
        storeAuthData('email', signUpAction.email);
        storeAuthData('password', signUpAction.password);
        storeAuthData('firstname', signUpAction.firstname);
        storeAuthData('lastname', signUpAction.lastname);
        yield put({ type : actionTypes.SIGNUP_SUCCESS});
      } catch (err) {
        let newErr = err.message;
        switch (newErr){
          case 'PreSignUp failed with error A user with the same email address exists.' : 
            newErr = 'Email Already Associated with an Account';
            break;
          case 'Custom auth lambda trigger is not configured for the user pool.' : 
            newErr = 'Password cannot be empty';
            break;
          case 'User already exists' : 
            newErr = 'Username Name is Taken';
            break;
        }
        yield put({ type : actionTypes.SIGNUP_FAILED, errorMsgUp : newErr})
      }
};

function* signInSaga (signInAction) {
      try {
          const response = yield call([Auth,'signIn'], ({ username: signInAction.username, password: signInAction.password }));
          yield storeAuthData('firstname',response.signInUserSession.idToken.payload.given_name);
          yield storeAuthData('lastname',response.signInUserSession.idToken.payload.family_name);
          yield storeAuthData('email',response.signInUserSession.idToken.payload.email);
          yield storeAuthData('token',response.signInUserSession.idToken.jwtToken);
          yield storeAuthData('username',response.username);
          yield storeAuthData('password', signInAction.password);
          yield put({ type : actionTypes.SIGNIN_SUCCESS});
      } catch (err) {
        let newErr = err.message;
          switch (newErr){
            case 'Custom auth lambda trigger is not configured for the user pool.' : 
              newErr = 'Password cannot be empty';
              break;
            case 'User does not exist.' : 
              newErr = 'Username does not exist';
              break;
            case 'Incorrect username or password.' : 
              newErr = 'Incorrect password';
              break;
          }
          yield put({ type : actionTypes.SIGNIN_FAILED, errorMsgIn : newErr});
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

function* getUserSaga(getUserAction){
  try {
    const userSaga = yield (getUser(getUserAction));
    yield put({ type : actionTypes.RETURN_USER, payload : userSaga});
  } catch (err) {
      console.log("sagas getUserSaga err: " , err);
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
function* watchGetUserSaga() {
  yield takeLatest(actionTypes.GET_USER, getUserSaga);
}

export default function* authSagas() {
    yield fork(watchSignUpSaga);
    yield fork(watchSignInSaga);
    yield fork(watchSignOutSaga);
    yield fork(watchGetUserSaga);
}

