import { put } from '../core/api';
import { validateRegister } from '../../../isomorphic/validation/authValidation';

export function register(user) {
  return new Promise((resolve, reject) => {
    const errors = validateRegister(user.username, user.password, user.email);

    if (errors.failed) {
      reject({ _error: errors });
    }

    return put('auth/register', {
      username: user.username,
      password: user.password,
      email: user.email
    })
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => {
      reject({ _error: error.data.details });
    });
  });
}
