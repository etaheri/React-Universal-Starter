/* eslint-disable no-constant-condition */
import {call, fork, take} from 'redux-saga/effects';
import {fetchHomeData} from '../../services/api';
import * as actions from './actions';

import { fetchEntity } from '../../utils/sagas';

const {home} = actions.sagaActions;


export const fetchData = fetchEntity.bind(null, home, fetchHomeData);

export function * loadHome() {
	yield call(fetchData);
}

/**
 ****************************** WATCHERS ***********************************
 **/

// Fetches data for a User : user data + starred repos
export function * watchLoadHomePage() {
	while (true) {
		yield take('LOAD_HOME_PAGE');
		yield fork(loadHome);
	}
}
