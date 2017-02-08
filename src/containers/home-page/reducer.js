import { Record, Map, fromJS } from 'immutable';

const InitialState = Record({
	homeLoaded: false,
	homeData: new Map({}),
});

const initialState = new InitialState();

// Updates an entity cache in response to any action with response.entities.
export const home = (state = initialState, action) => {
	switch(action.type) {
		case 'HOME_SUCCESS':
  		const {data} = action.response;
  		const dataObj =  fromJS({'homeData': data});
  		state = state.set('homeLoaded', true);
  		return state.merge({}, state, dataObj);
    default:
      return state;
  }
};

export default home;
