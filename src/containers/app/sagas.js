/* eslint-disable no-constant-condition */
import { take, call, fork, join } from 'redux-saga/effects';
import { fetchAppData } from '../../services/api';
import * as actions from './actions';

import { fetchEntity } from '../../utils/sagas';

const { app } = actions.sagaActions;

import { watchLoadHomePage } from '../../containers/home-page/sagas';

// CUSTOM METHOD FOR USAGE AT server.js TO RUN SAGAS ON SERVER SIDE (e.g. fetch data)
export const waitAll = sagas => function* genTasks() {
  const tasks = yield sagas.map(([saga, ...params]) => fork(saga, ...params));
  yield tasks.map(join);
};


export const fetchData = fetchEntity.bind(null, app, fetchAppData);


export function* loadAppPage() {
	yield call(fetchData);
}


/******************************** WATCHERS *************************************/

export function* watchLoadAppPage() {
  while(true) {
    yield take(actions.LOAD_APP_PAGE);
    yield fork(loadAppPage);
  }
}


/******************************** ROOT SAGA *************************************/

export default function* rootSaga() {
	yield [
		fork(watchLoadAppPage),
		fork(watchLoadHomePage),
	];
}
