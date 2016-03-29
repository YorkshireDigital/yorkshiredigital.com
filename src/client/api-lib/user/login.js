import { post } from '../core/api';
import { validateLogin } from '../../../isomorphic/validation/authValidation';

export function login(details) {
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
      resolve(response.data);
    })
    .catch((error) => {
      reject({ _error: { global: error.data.message } });
    });
  });
}
