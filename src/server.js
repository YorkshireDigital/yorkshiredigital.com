/* global __DEV__, __PRODUCTION__ */

import { Server } from 'hapi';
import h2o2 from 'h2o2';
import * as _ from 'lodash';
import inert from 'inert';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { RouterContext, match } from 'react-router';
import { Provider } from 'react-redux';

import configureStore from './store.js';
import RadiumContainer from './isomorphic/containers/RadiumContainer';
import routesContainer from './routes';
import config from './server/config/app';
import controllers from './server/config/routes';

let routes = routesContainer;
const store = configureStore();
const initialState = store.getState();

function _validate(decoded, request, callback) {
  // Do any required checks here
  return callback(null, true);
}

function _setupRoutes(server) {
  // Set up controller routes
  server.route(controllers.config);

  // Catch dynamic requests here to fire-up React Router.
  server.ext('onPreResponse', (request, reply) => {
    if (typeof request.response.statusCode !== 'undefined') {
      return reply.continue();
    }
    match({ routes, location: request.path }, (error, redirectLocation, renderProps) => {
      if (redirectLocation) {
        reply.redirect(redirectLocation.pathname + redirectLocation.search);
        return;
      }
      if (error || !renderProps) {
        reply.continue();
        return;
      }
      const reactString = ReactDOM.renderToString(
        <Provider store={store}>
          <RadiumContainer radiumConfig={{ userAgent: request.headers['user-agent'] }}>
            <RouterContext {...renderProps} />
          </RadiumContainer>
        </Provider>
      );
      const webserver = __PRODUCTION__ ? '' : `//${config.host}:8080`;
      const output = (
		`<!doctype html>
  		<html lang='en-us'>
  			<head>
  				<meta charset='utf-8'>
  				<title>Hapi Universal Redux</title>
  				<link rel='shortcut icon' href='/favicon.ico'>
          <link href='https://fonts.googleapis.com/css?family=Roboto:400,300,500' rel='stylesheet' type='text/css'>
  			</head>
  			<body>
  				<div id='react-root'>${reactString}</div>
  				<script>
  					window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
  					window.__UA__ = ${JSON.stringify(request.headers['user-agent'])}
  				</script>
  				<script src=${webserver}/dist/client.js></script>
  			</body>
  		</html>`
      );
      reply(output);
      return;
    });
    return reply;
  });
}

function _setupAuth(server) {
  server.auth.strategy('jwt', 'jwt',
    {
      key: config.secretKey,
      validateFunc: _validate,
      verifyOptions: { algorithms: ['HS256'] }
    });

    // Setup the social Twitter login strategy
  server.auth.strategy('twitter', 'bell', {
    provider: 'twitter',
    password: 'secret_cookie_encryption_password',
    clientId: '1Z2ugfXBelmooqD2H5dgM7RQJ',
    clientSecret: 'abiFnkA7ImjxlAH5voJP4rq03LbrdnYkTytPPRkGr3xaM7E5EG',
    isSecure: false
  });
}

function _setupDb() {
  return {
    register: require('hapi-sequelize'),
    options: require('./server/config/db_config')
  };
}

function _syncDb(server, callback) {
  const db = server.plugins['hapi-sequelize'].db;
  console.log('DB =>', db.sequelize.models);
  db.sequelize.sync({ force: true }).then(callback);

  server.ext('onPreHandler', (function setup(modelCollections) {
    return function foo(request, reply) {
      request.domain = modelCollections;
      reply.continue();
    };
  }(server.plugins['hapi-sequelize'].db.sequelize.models)));
}

// Start Hapi server
const server = new Server();

server.connection(_.pick(config, ['host', 'port', 'routes']));

server.register([
  h2o2,
  inert,
  _setupDb(),
  require('bell'),
  require('hapi-auth-jwt2')
		// WebpackPlugin
	],
	(err) => {
  if (err) { throw err; }

  _setupAuth(server);
  _setupRoutes(server);
  _syncDb(server, () => {
    server.start(() => {
      console.info('==> ✅  Server is listening 😏');
      console.info(`==> 🌎  Go to ${server.info.uri.toLowerCase()}`);
    });
  });
});

// wire up hot reloader
if (__DEV__) {
  if (module.hot) {
    console.log('[HMR] Waiting for server-side updates');

    module.hot.accept('./routes', () => {
      routes = require('./routes');
    });

    module.hot.addStatusHandler((status) => {
      if (status === 'abort') {
        setTimeout(() => process.exit(0), 0);
      }
    });
  }
}
