/* middleware for Redux */

import { createMetrics } from 'react-metrics';
import GoogleAnalytics from '../utils/google-analytics';
import {
	LOCATION_CHANGE,
} from 'react-router-redux';

// google tag manager

// TODO move this config?
// TODO is pageDefaults needed?
const config = {
	vendors: [{
		api: new GoogleAnalytics(),
	}],
	pageDefaults: () => {
		const timestamp = new Date();
		return {
			timestamp,
			siteName: 'October',
		};
	},
	pageViewEvent: 'pageView',
	debug: false,
};

const metrics = createMetrics(config);

export default function middlewareMetrics({ getState }) {
	return next => action => {
		const returnValue = next(action);
		switch (action.type) {
			case LOCATION_CHANGE:
				metrics.setRouteState(action.payload);
				metrics.api.pageView(action.payload);
				break;
			default:
		}
		return returnValue;
	};
}
