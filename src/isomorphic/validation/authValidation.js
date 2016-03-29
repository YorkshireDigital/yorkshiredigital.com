function _appendError(errors, field, message) {
  const newErrors = errors;
  newErrors.failed = true;
  newErrors[field] = message;
  return newErrors;
}

export function validateRegister(username, password, email) {
  let errors = {};
  if (!username) {
    errors = _appendError(errors, 'username', 'please provide a username');
  }
  if (!email) {
    errors = _appendError(errors, 'email', 'please provide an email');
  } else if (email.indexOf('@') === -1) {
    errors = _appendError(errors, 'email', 'please provide a valid email address');
  }
  if (!password) {
    errors = _appendError(errors, 'password', 'please supply a password');
  } else if (password.length < 6) {
    errors = _appendError(errors, 'password', 'please supply a password over 6 characters');
  }
  return errors;
}

export function validateLogin(username, password) {
  let errors = {};
  if (!username) {
    errors = _appendError(errors, 'username', 'please provide a username');
  }
  if (!password) {
    errors = _appendError(errors, 'password', 'please supply a password');
  }
  return errors;
}
