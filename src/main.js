import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Root from './containers/root/root';
import rootSaga from './containers/app/sagas';
import { fromJS } from 'immutable';
import FastClick from 'fastclick';
import { AppContainer } from 'react-hot-loader'

import configureStore from './store';
import getRoutes from './routes';

import './index.css';

async function renderClient() {
	// window.__data = initial state passed down by server to client
	let initialState = window.__data; // eslint-disable-line
	// Configure store and routes

	let store = null;
	if (initialState) {
		initialState.app = fromJS(initialState.app);
		initialState.home = fromJS(initialState.home);
		initialState.ui = fromJS(initialState.ui);

		store = configureStore({
			browserHistory,
			initialState,
		});
	} else {
		store = configureStore({
			browserHistory
		});
	}

	const history = syncHistoryWithStore(browserHistory, store);

	const appEl = document.getElementById('root');

	store.runSaga(rootSaga);

	ReactDOM.render(
		<AppContainer>
			<Root store={store} history={history} routes={getRoutes(store)}/>
		</AppContainer>,
	  appEl
	);

	// Hot Module Replacement API
	if (module.hot) {
	  module.hot.accept('./containers/root/root', () => {
	    const NextRoot = require('./containers/root/root').default;
	    ReactDOM.render(
	      <AppContainer>
	        <NextRoot/>
	      </AppContainer>,
	      document.getElementById('root')
	    );
	  });
	}

	// Remove click delays on browsers with touch
	FastClick.attach(document.body);
}

renderClient();
