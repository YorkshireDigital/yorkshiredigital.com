import Boom from 'boom';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import config from '../config/app';
import { validateRegister, validateLogin } from '../../universal/validation/authValidation';

const authController = (function build() {
  function _generateToken(payload) {
    return {
      token: jwt.sign(payload, config.secretKey, { expiresIn: '24h' })
    };
  }

  function _validationResponse(validationErrors) {
    const response = Boom.badRequest('Validation error');
    response.output.payload.details = [validationErrors];
    return response;
  }

  function _validateRegister(username, password, email) {
    const validationErrors = validateRegister(username, password, email);
    if (validationErrors.failed) {
      return _validationResponse(validationErrors);
    }
  }

  function _validateLogin(username, password) {
    const validationErrors = validateLogin(username, password);
    if (validationErrors.failed) {
      return _validationResponse(validationErrors);
    }
  }

  return {

    twitter: (request, reply) => {
      if (!request.auth.isAuthenticated) {
        return reply(Boom.unauthorized(`Authentication failed: ${request.auth.error.message}`));
      }
      request.auth.session.set(request.auth.credentials);
      return reply.redirect('/');
    },
    login: (request, reply) => {
      const { username, password } = request.payload;
      const invalidResponse = _validateLogin(username, password);
      if (invalidResponse) {
        reply(invalidResponse);
        return;
      }

      request.domain.user.findOne({
        where: { $or: [
          { username },
          { email: username }
        ] }
      }).then((user) => {
        if (!user) {
          reply(Boom.unauthorized('Login unsuccessful'));
          return;
        }
        bcrypt.compare(password, user.password, (err, isValid) => {
          if (isValid) {
            const token = _generateToken({ id: user.id, username: user.username, email: user.email });
            reply({ token: token.token });
          } else {
            reply(Boom.unauthorized('Login unsuccessful'));
          }
        });
      });
    },
    register: (request, reply) => {
      const { username, password, email } = request.payload;
      const invalidResponse = _validateRegister(username, password, email);
      if (invalidResponse) {
        reply(invalidResponse);
        return;
      }
      request.domain.user.create({ username, password: bcrypt.hashSync(password, 10), email })
        .then((user) => {
          const token = _generateToken({ id: user.id, username: user.username, email: user.email });
          reply({ token: token.token });
        })
        .catch((error) => {
          const response = Boom.badRequest(error.message);
          if (error.message === 'Validation error') {
            const errorResponse = {};
            for (let i = 0; i < error.errors.length; i++) {
              const e = error.errors[i];
              errorResponse[e.path] = e.message;
            }
            response.output.payload.details = errorResponse;
          }
          reply(response);
        });
    }
  };
}());

module.exports = authController;
