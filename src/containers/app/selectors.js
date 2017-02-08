import { createSelector } from 'reselect';

const selectApp = (state) => state.app;
const selectBrowser = () => (state) => state.browser;

const selectData = createSelector(
	selectApp,
	app => app.get('appData')
);

const selectDataLoaded = createSelector(
	selectApp,
	app => app.get('appLoaded')
);

const selectBrowserWidth = createSelector(
	selectBrowser(),
	browserState => browserState.width
);

const selectBrowserHeight = createSelector(
	selectBrowser(),
	browserState => browserState.height
);

const selectBrowserPhablet = createSelector(
	selectBrowser(),
	(browserState) => browserState.lessThan.tabletH
);

export {
	selectData,
	selectDataLoaded,
	selectBrowserWidth,
	selectBrowserHeight,
	selectBrowserPhablet,
};
