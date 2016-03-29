import { post } from '../core/api';
import { validateLogin } from '../../../isomorphic/validation/authValidation';

export function login(details) {
  const validationErrors = validateLogin(details.username, details.password);

  if (validationErrors.failed) {
    return Promise.resolve({
      registered: false,
      errors: validationErrors
    });
  }

  return post('auth/login', {
    username: details.username,
    password: details.password
  })
  .then((response) => {
    console.log('SUCCESS => ', response);
    return {
      loginSuccess: true,
      token: response.data.token
    };
  })
  .catch((error) => {
    console.log('ERROR => ', error);
    return {
      loginSuccess: false,
      errors: error
    };
  });
}
