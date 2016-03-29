import { createStore, applyMiddleware, compose } from 'redux';
// import persistState from 'redux-localstorage';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from './isomorphic/reducers';
import DevTools from './isomorphic/utils/DevTools';

export default function (initialState, history) {
  const finalCreateStore = compose(
		applyMiddleware(thunk, routerMiddleware(history)),
    // persistState(),
		DevTools.instrument()
	)(createStore);

  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
		// Enable Webpack hot module replacement for isomorphic/reducers
    module.hot.accept('./isomorphic/reducers', () => {
      const { reducer: nextReducer } = require('./isomorphic/reducers/index');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
