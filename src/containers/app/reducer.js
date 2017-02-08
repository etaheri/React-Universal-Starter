import { Record, Map, fromJS } from 'immutable';

const InitialState = Record({
	appLoaded: false,
	appData: new Map({}),
});

const initialState = new InitialState();

export const app = (state = initialState, action) => {
	switch(action.type) {
		case 'APP_SUCCESS':
			const { data } = action.response;
			const dataObj =  fromJS({'appData': data});
			state = state.set('appLoaded', true);
			return state.merge({}, state, dataObj);
		default:
		  return state;

	}
};

export default app;
