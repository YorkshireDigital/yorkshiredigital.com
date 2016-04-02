function _appendError(errors, field, message) {
  const newErrors = errors;
  newErrors.failed = true;
  newErrors[field] = message;
  return newErrors;
}

export function validateRegister(username, password, email) {
  const usernameMatch = /^[a-z0-9-]+$/i;
  const emailMatch = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  let errors = {};
  if (!username) {
    errors = _appendError(errors, 'username', 'Please provide a username');
  } else if (!username.match(usernameMatch)) {
    errors = _appendError(errors, 'username', 'Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen');
  }
  if (!email) {
    errors = _appendError(errors, 'email', 'Please provide an email');
  } else if (!email.match(emailMatch)) {
    errors = _appendError(errors, 'email', 'Please provide a valid email address');
  }
  if (!password) {
    errors = _appendError(errors, 'password', 'Please supply a password');
  } else if (password.length < 6) {
    errors = _appendError(errors, 'password', 'Please supply a password over 6 characters');
  }
  return errors;
}

export function validateLogin(username, password) {
  let errors = {};
  if (!username) {
    errors = _appendError(errors, 'username', 'Please provide a username');
  }
  if (!password) {
    errors = _appendError(errors, 'password', 'Please supply a password');
  }
  return errors;
}
