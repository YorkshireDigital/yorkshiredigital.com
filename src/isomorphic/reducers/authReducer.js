import {
	REGISTER_STARTED, REGISTER_SUCCESS, REGISTER_FAILED,
	LOGIN_STARTED, LOGIN_SUCCESS, LOGIN_FAILED
} from '../actions/authActions';
const initialState = {
  validationErrors: null,
  isLoading: false,
  token: undefined,
  isAuthenticated: false // localStorage && !(localStorage.getItem('id_token') === null)
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_STARTED:
      return Object.assign({}, state, {
        isLoading: true,
        validationErrors: null,
        isAuthenticated: false
      });
    case REGISTER_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        validationErrors: null,
        isAuthenticated: true,
        token: action.token
      });
    case REGISTER_FAILED:
      return Object.assign({}, state, {
        isLoading: false,
        validationErrors: action.errors.data.details,
        isAuthenticated: false
      });
    case LOGIN_STARTED:
      return Object.assign({}, state, {
        isLoading: true,
        validationErrors: null,
        isAuthenticated: false
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        validationErrors: null,
        token: action.token,
        isAuthenticated: true
      });
    case LOGIN_FAILED:
      return Object.assign({}, state, {
        isLoading: false,
        validationErrors: { password: action.errors.data.message },
        isAuthenticated: false
      });
    default:
      return state;
  }
}
