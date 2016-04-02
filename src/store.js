import { createStore, applyMiddleware, compose } from 'redux';
// import persistState from 'redux-localstorage';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from './universal/reducers';
import DevTools from './universal/utils/DevTools';

export default function (initialState, history) {
  const finalCreateStore = compose(
		applyMiddleware(thunk, routerMiddleware(history)),
    // persistState(),
		DevTools.instrument()
	)(createStore);

  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
		// Enable Webpack hot module replacement for universal/reducers
    module.hot.accept('./universal/reducers', () => {
      const { reducer: nextReducer } = require('./universal/reducers/index');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
