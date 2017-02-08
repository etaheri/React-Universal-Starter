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

export const HOME = createRequestTypes('HOME');

export const LOAD_HOME_PAGE = 'LOAD_HOME_PAGE';

export const sagaActions = {
  home: {
    request: () => action(HOME.REQUEST),
    success: (response) => action(HOME.SUCCESS, { response }),
    failure: (error) => action(HOME.FAILURE, { error }),
  },
}

export const viewActions = {
  loadHomePage: () => (
    action(LOAD_HOME_PAGE, {})
  )
}
