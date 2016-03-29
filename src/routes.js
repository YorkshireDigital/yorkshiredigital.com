import React from 'react';
import { Router, Route } from 'react-router';
import AppContainer from './isomorphic/containers/AppContainer';
import Header from './isomorphic/components/Header';
import Home from './isomorphic/components/Home';
import Login from './isomorphic/containers/LoginContainer';
import Register from './isomorphic/components/Register';

/**
 * The React Routes for both the server and the client.
 */
module.exports = (
	<Router>
		<Route component={AppContainer}>
			<Route component={Header}>
				<Route path="/" component={Home} />
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
			</Route>
		</Route>
	</Router>
);
