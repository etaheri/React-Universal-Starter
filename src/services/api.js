import 'isomorphic-fetch';
// import config from 'config';

const PROXY_ROOT = '/api';

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function callApi(endpoint) {

	let apiBaseUrl = null;
	let env = null;
	if(typeof window !== 'undefined') {
		env = window.__apienv
	} else {
		env = process.env.API_ENV;;
	}
	switch (env) {
		case 'production':
			apiBaseUrl = ''
			break;
		case 'staging':
			apiBaseUrl = ''
			break;
		case 'dev':
			apiBaseUrl = '/dev-data/'
			break;
		default:
			apiBaseUrl = '/dev-data/'
	}


  let fullUrl = (endpoint.indexOf(PROXY_ROOT) === -1) ? `${apiBaseUrl}${endpoint}` : endpoint;

  // If request comes from server side, call API url directly.
  // if (__SERVER__) {
  //   fullUrl = (endpoint.indexOf('http://dev.october.sdny.in/api') === -1)
  //                 ? `'http://dev.october.sdny.in/api'/${endpoint}` : endpoint;
  // }

  return fetch(fullUrl)
    .then(response =>
      response.json().then(json => ({ json, response }))
    )
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
    .then(
      response => ({ response }),
      error => ({ error: error.message || 'Something bad happened.' })
      );
}

// api services
export const fetchAppData = slug => callApi(`app.json`);
export const fetchHomeData = slug => callApi(`home.json`);
