import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  routing: routerReducer,
  form: formReducer
});

export default rootReducer;
