import { reduxForm } from 'redux-form';

import { loginSuccess } from '../actions/authActions';
import { validateLogin } from '../validation/authValidation';
import LoginForm from '../components/LoginForm';
import { login } from '../../client/api-lib/user';

const submit = (values, dispatch) =>
  login(values)
    .then(response => {
      // localStorage.setItem('id_token', response.token);
      return dispatch(loginSuccess(response));
    });


const validate = (values) => {
  const errors = validateLogin(values.username, values.password, values.email);
  return errors || {};
};

function mapStateToProps(state) {
  const { auth } = state;
  const { validationErrors } = auth;
  return { validationErrors };
}

export default reduxForm({
  form: 'RegisterForm',
  fields: ['username', 'password'],
  validate,
  onSubmit: submit
}, mapStateToProps, null)(LoginForm);
