import { reduxForm } from 'redux-form';

import { registerSuccess } from '../actions/authActions';
import { validateRegister } from '../validation/authValidation';
import RegisterForm from '../components/RegisterForm';
import { register } from '../../client/api-lib/user';

const submit = (values, dispatch) =>
  register(values)
    .then(response => {
      // localStorage.setItem('id_token', response.token);
      return dispatch(registerSuccess(response));
    });

const validate = (values) => {
  const errors = validateRegister(values.username, values.password, values.email);
  return errors || {};
};

function mapStateToProps(state) {
  const { auth } = state;
  const { isLoading, validationErrors } = auth;
  return { isLoading, validationErrors };
}

export default reduxForm({
  form: 'RegisterForm',
  fields: ['username', 'email', 'password'],
  validate,
  onSubmit: submit
}, mapStateToProps, null)(RegisterForm);
