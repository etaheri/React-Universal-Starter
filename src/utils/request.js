// TODO: check if the promise polyfill is still necessary
require('es6-promise').polyfill();
import 'isomorphic-fetch';

/**
 * Parses the JSON returned from request
 * @param  {object} response From a request
 * @return {object}          The parsed JSON from a request
 */
function parseJSON(response) {
	return response.json();
}

/**
 * Checks the response from request is valid or not
 * @param  {object} response From a request
 * @return {object|undefined}          Either the response if valid, or throws an error
 */
function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) return response;
	const error = new Error(response.statusText);
	error.response = response;
	throw error;
}

/**
 * Requests a URL and returns a Promise
 * @param  {string} url     URL for the request
 * @param  {object} options Any options to pass to "fetch"
 * @return {object}         Object containing data or error
 */
export function requestJSON(url, options) {
	console.warn('request - json - ' + url)
	return fetch(url, options)
		.then(checkStatus)
		.then(parseJSON)
		.then((data) => ({ data }))
		.catch((err) => ({ err }));
}

export default function request(url, options) {
	return fetch(url, options)
		.then(checkStatus)
		.then((response) => (response.text()))
		.catch((err) => ({ err }));
}
