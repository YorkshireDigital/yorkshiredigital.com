import { push } from 'react-router-redux';

import { register as registerApi } from '../../client/api-lib/user';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const REGISTER_STARTED = 'REGISTER_STARTED';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

/*
 * LOGIN ACTIONS
 */

export function loginSuccess(response) {
  return dispatch => {
    dispatch({
      type: LOGIN_SUCCESS,
      token: response
    });
    dispatch(push('/'));
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
