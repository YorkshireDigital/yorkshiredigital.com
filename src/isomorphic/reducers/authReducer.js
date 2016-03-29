import { REGISTER_SUCCESS, LOGIN_SUCCESS } from '../actions/authActions';
const initialState = {
  token: undefined,
  isAuthenticated: false // localStorage && !(localStorage.getItem('id_token') === null)
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return Object.assign({}, state, {
        token: action.token,
        isAuthenticated: true
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        token: action.token,
        isAuthenticated: true
      });
    default:
      return state;
  }
}
