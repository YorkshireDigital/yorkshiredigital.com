import React from 'react';
import { Router, Route } from 'react-router';
import AppContainer from './universal/containers/AppContainer';
import Header from './universal/components/Header';
import Home from './universal/components/Home';
import Login from './universal/containers/LoginContainer';
import Register from './universal/containers/RegisterContainer';

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
