import * as actionTypes from "./actionTypes";

export const signUpAction = (firstname, lastname, username, email, password) => {
  return {
        type: actionTypes.REGISTER,
        firstname: firstname, 
        lastname: lastname, 
        username: username,
        password: password,
        email: email
    }
  }
  
  export const signUpSuccessAction = () => {
    return {
        type: actionTypes.SIGNUP_SUCCESS
    }
  }
  
  export const signUpFailedAction = (errorMsg) => {
    return {
        type: actionTypes.SIGNUP_FAILED,
        errorMsgUp: errorMsg
    }
  }

  export const signInAction = (username, password) => {
    return {
        type: actionTypes.LOGIN,
        username: username,
        password: password
    }
  }

  export const signInSuccessAction = () => {
    return {
        type: actionTypes.SIGNIN_SUCCESS
    }
  }
  
  export const signInFailedAction = (errorMsg) => {
    return {
      type: actionTypes.SIGNIN_FAILED,
      errorMsgIn: errorMsg
    }
  }
  
  export const signOutAction = () => {
    return {
        type: actionTypes.SIGNOUT
    }
  }
