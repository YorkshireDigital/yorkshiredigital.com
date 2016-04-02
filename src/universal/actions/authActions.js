import { push } from 'react-router-redux';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

/*
 * LOGIN ACTIONS
 */

export function loginSuccess(response) {
  return dispatch => {
    dispatch({
      type: LOGIN_SUCCESS,
      token: response.token
    });
    dispatch(push('/'));
  };
}

/*
 * REGISTER ACTIONS
 */
export function registerSuccess(response) {
  return dispatch => {
    dispatch({
      type: REGISTER_SUCCESS,
      token: response.token
    });
  };
}
