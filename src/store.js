import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from './reducer';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import { responsiveStoreEnhancer } from 'redux-responsive';
import middlewareMetrics from './middleware/middleware-metrics';


// TODO check this is only imported for development
import installDevTools from 'immutable-devtools';
import Immutable from 'immutable';


const USE_DEV_TOOLS =
	process.env.DEV &&
	window.devToolsExtension;

if (USE_DEV_TOOLS)
	installDevTools(Immutable);

/* http://redux.js.org/docs/api/applyMiddleware.html */

export default function configureStore(options = {}) {
	const {
		initialState = {},
		browserHistory = {},
	} = options;

	const middlewares = [];

	const sagaMiddleware = createSagaMiddleware();

	middlewares.push(
		middlewareMetrics,
		sagaMiddleware,
		routerMiddleware(browserHistory),
	);

	const verbose = false;
	if (verbose && USE_DEV_TOOLS) middlewares.push(createLogger());

	const createReduxStore = USE_DEV_TOOLS
		? compose(responsiveStoreEnhancer, applyMiddleware(...middlewares), window.devToolsExtension())
		: compose(responsiveStoreEnhancer, applyMiddleware(...middlewares));

	const store = createReduxStore(createStore)(rootReducer, initialState);

	store.runSaga = sagaMiddleware.run;
  store.asyncReducers = {}; // Async reducer registry

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers.
		module.hot.accept('./reducer', () => {
			System.import('./reducer').then((reducerModule) => {
				const createReducers = reducerModule.default;
				const nextReducers = createReducers(store.asyncReducers);

				store.replaceReducer(nextReducers);
			});
		});
	}

	return store;
}
