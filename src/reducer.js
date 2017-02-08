import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import { createResponsiveStateReducer } from 'redux-responsive';

import { app } from './containers/app/reducer';
import { home } from './containers/home-page/reducer';
import { ui } from './containers/ui/reducer';

// Combine all reducers with routeReducer named `routing` into a single rootReducer
// See _media-queries.scss for media query sizes
export default combineReducers({
	routing,
	app,
	browser: createResponsiveStateReducer({
		mobile: 360,
		phablet: 540,
		tablet: 768,
		tabletH: 1024,
		desktop: 1280,
		desktopM: 1440,
		desktopL: 1680,
		desktopXL: 1920,
	}),
	ui,
	home,
});
