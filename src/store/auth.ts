import Actions from './authActions';

const INITIAL_STATE = {
    errorMsgIn: "",
    errorMsgUp: "",
    loggedIn: false
};

const auth = ( state = INITIAL_STATE, action:Actions) => {
    switch (action.type) {
     case "REGISTER":
        return {
            ...state,
            errorMsgUp: 'Processing sign up...'
          };
      case "SIGNUP_SUCCESS":
        return {
            ...state,
            loggedIn: true,
            errorMsgUp:'Sign up success. Please check your email to verify before login'
        };
      case "SIGNUP_FAILED":
        return {
            ...state,
            errorMsgUp:action.errorMsgUp
        };
      case "LOGIN":
        return {
            ...state,
            errorMsgIn:'Processing sign in...'
        };
      case "SIGNIN_SUCCESS":
        return {
            ...state,
            loggedIn: true,
            errorMsgIn:'Sign In success'
        };      
      case "SIGNIN_FAILED":
        return {
            ...state,
            errorMsgIn:action.errorMsgIn
        };      
      case "SIGNOUT":
          return {
              ...state,
              loggedIn: false,
              errorMsgIn:'Processing sign out...'
          };
      default:
        return state;
    }
};

export default auth;