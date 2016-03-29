import { post } from '../core/api';
import { validateLogin } from '../../../isomorphic/validation/authValidation';

export function login(details, successHandler) {
  return new Promise((resolve, reject) => {
    const errors = validateLogin(details.username, details.password);
    if (errors.failed) {
      reject({ _error: errors });
    }

    return post('auth/login', {
      username: details.username,
      password: details.password
    })
    .then((response) => {
      if (successHandler) {
        successHandler({
          token: response.data.token
        });
      }
      resolve();
    })
    .catch((error) => {
      reject({ _error: { global: error.data.message } });
    });
  });
}
