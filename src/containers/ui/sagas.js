
import {put, call, fork, take} from 'redux-saga/effects';
import {fetchSearchData} from '../../services/api';
import * as actions from './actions';

const {search} = actions.sagaActions;

// resuable fetch Subroutine
// entity :  user | repo | starred | stargazers
// apiFn  : api.fetchUser | api.fetchRepo | ...
// id     : login | fullName
// url    : next page url. If not provided will use pass it to apiFn
function * fetchEntity(entity, apiFn, id, url) {
	yield put(entity.request());
	const {response, error} = yield call(apiFn, url || id);
	if (response) {
		yield put(entity.success(response));
	} else {
		yield put(entity.failure(error));
	}
}

export const fetchData = fetchEntity.bind(null, search, fetchSearchData);

export function * querySearch(query) {
	yield call(fetchData, query);
}


/**
 ****************************** WATCHERS ***********************************
 **/

// Fetches data for a User : user data + starred repos
export function * watchSearchQuery() {
	while (true) {
		const { query } = yield take('QUERY_SEARCH');
		yield fork(querySearch, query);
	}
}
