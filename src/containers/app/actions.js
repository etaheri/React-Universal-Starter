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
  return { type, ...payload };
}

export const APP = createRequestTypes('APP');

export const LOAD_APP_PAGE = 'LOAD_APP_PAGE';

export const sagaActions = {
  app: {
    request: () => action(APP.REQUEST),
    success: (response) => action(APP.SUCCESS, { response }),
    failure: (error) => action(APP.FAILURE, { error }),
  },
}

export const viewActions = {
  loadAppPage: () => (
    action(LOAD_APP_PAGE, {})
  ),
}
