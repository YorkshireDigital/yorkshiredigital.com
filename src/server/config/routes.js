import AuthController from '../controllers/auth_controller';

const routes = {
  config: [
    { method: 'GET',     path: '/{params*}',      config: { auth: false, handler: { file: (request) => `static${request.path}` } } },
    { method: 'GET',     path: '/auth/twitter',   config: { auth: 'twitter', handler: AuthController.twitter } },
    { method: 'PUT',     path: '/auth/register',  config: { auth: false, handler: AuthController.register } },
    { method: 'POST',    path: '/auth/login',     config: { auth: false, handler: AuthController.login } }
  ]
};

module.exports = routes;
