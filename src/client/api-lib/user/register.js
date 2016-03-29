import { put } from '../core/api';
import { validateRegister } from '../../../isomorphic/validation/authValidation';

export function register(user) {
  const validationErrors = validateRegister(user.username, user.password, user.email);

  if (validationErrors.failed) {
    return Promise.resolve({
      registered: false,
      errors: validationErrors
    });
  }

  return put('auth/register', {
    username: user.username,
    password: user.password,
    email: user.email
  })
  .then((response) => {
    console.log('SUCCESS => ', response);
    return {
      registered: true,
      token: response.data.token
    };
  })
  .catch((error) => {
    console.log('ERROR => ', error);
    return {
      registered: false,
      errors: error
    };
  });
}
