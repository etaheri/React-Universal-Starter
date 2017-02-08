import { createSelector } from 'reselect';

const selectData = (state) => state.home;

const selectHomeLoaded = createSelector(
	selectData,
	data => data.get('homeLoaded')
);

const selectHomeData = createSelector(
	selectData,
	data => data.get('homeData')
);

export {
	selectHomeLoaded,
	selectHomeData,
};
