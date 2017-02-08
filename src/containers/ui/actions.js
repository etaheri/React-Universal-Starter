export const UI_MENU_SIDE_TOGGLE = 'ui/UI_MENU_SIDE_TOGGLE';
export const UI_SEARCH_TOGGLE = 'ui/UI_SEARCH_TOGGLE';
export const UI_TOGGLE_LOGO = 'ui/UI_TOGGLE_LOGO';

const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

function createRequestTypes(base) {
	const res = {};
	//eslint-disable-next-line
	[REQUEST, SUCCESS, FAILURE].forEach(type => res[type] = `${base}_${type}`);
	return res;
}

function action(type, payload = {}) {
	return {
		type,
		...payload
	};
}


export function toggleSidebar(status) {
	return {
		type: UI_MENU_SIDE_TOGGLE,
		status,
	};
}

export function toggleSearch(status) {
	return {
		type: UI_SEARCH_TOGGLE,
		status,
	};
}

export function toggleLogo(status) {
	return {
		type: UI_TOGGLE_LOGO,
		status,
	};
}

export const SEARCH = createRequestTypes('SEARCH');
export const QUERY_SEARCH = 'QUERY_SEARCH';

export const sagaActions = {
	search: {
		request: () => action(SEARCH.REQUEST),
		success: (response) => action(SEARCH.SUCCESS, {response}),
		failure: (error) => action(SEARCH.FAILURE, {error})
	}
}

export const viewActions = {
	loadSearchQuery: (query) => (action(QUERY_SEARCH, {query}))
}
