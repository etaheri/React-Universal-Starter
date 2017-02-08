import { createSelector } from 'reselect';

const selectUI = state => state.ui;

const selectActive = createSelector(
	selectUI,
	ui => ui.get('menuActive'),
);

export {
	selectActive,
};
