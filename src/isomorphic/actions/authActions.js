import { push } from 'react-router-redux';

import { register as registerApi, login as loginApi } from '../../client/api-lib/user';

export const LOGIN_STARTED = 'LOGIN_STARTED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const REGISTER_STARTED = 'REGISTER_STARTED';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

/*
 * LOGIN ACTIONS
 */

function requestLogin(user) {
  return {
    type: LOGIN_STARTED,
    user
  };
}

function successfulLogin(user, response) {
  return dispatch => {
    dispatch({
      type: LOGIN_SUCCESS,
      user,
      token: response
    });
    dispatch(push('/'));
  };
}

function failedLogin(user, response) {
  return {
    type: LOGIN_FAILED,
    user,
    errors: response.errors
  };
}

function finishedLogin(user, response) {
  if (response.loginSuccess) {
    return successfulLogin(user, response);
  }
  return failedLogin(user, response);
}

export function login(props) {
  const user = props;
  return dispatch => {
    dispatch(requestLogin(user));
    loginApi(user).then(response => {
      localStorage.setItem('id_token', response.token);
      dispatch(finishedLogin(user, response));
    });
  };
}

/*
 * REGISTER ACTIONS
 */
function requestRegister(user) {
  return {
    type: REGISTER_STARTED,
    user
  };
}

function successfulRegister(user, response) {
  return dispatch => {
    dispatch({
      type: REGISTER_SUCCESS,
      user,
      response
    });
  };
}

function failedRegister(user, response) {
  return {
    type: REGISTER_FAILED,
    user,
    errors: response.errors
  };
}

function finishedRegister(user, response) {
  if (response.registered) {
    return successfulRegister(user, response);
  }
  return failedRegister(user, response);
}

export function register(props) {
  const user = props;
  return dispatch => {
    dispatch(requestRegister(user));
    registerApi(user)
      .then(response => {
        localStorage.setItem('id_token', response.token);
        return dispatch(finishedRegister(user, response));
      });
  };
}
