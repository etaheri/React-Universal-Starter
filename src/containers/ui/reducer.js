import { Record, fromJS, Map } from 'immutable';
import {
	UI_MENU_SIDE_TOGGLE,
	UI_SEARCH_TOGGLE,
	UI_TOGGLE_LOGO,
} from './actions';

const InitialState = Record({
	menuSideActive: false,
	globalSearchActive: false,
	logoActive: true,
	beerResults: new Map({}),
	searchResults: new Map({}),
});

const initialState = new InitialState();

export const ui = (state = initialState, action) => {
	switch (action.type) {
		case UI_MENU_SIDE_TOGGLE: {
			const value = action.payload;
			return state.update('menuSideActive', current => (value === undefined ? !current : value));
		}
		case UI_SEARCH_TOGGLE: {
			const value = action.payload;
			return state.update('globalSearchActive', current => (value === undefined ? !current : value));
		}
		case UI_TOGGLE_LOGO: {
			const value = action.payload;
			return state.update('logoActive', current => (value === undefined ? !current : value));
		}
		case 'SEARCH_SUCCESS': {
			const results = fromJS(action.response.results);
			return state.set('searchResults', results)
		}
		default: return state;
	}
}
