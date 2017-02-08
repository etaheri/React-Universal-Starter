import React from 'react';
import { Route } from 'react-router';
import App from './containers/app/app';
import HomePage from './containers/home-page/home-page';
import NotFoundPage from './containers/not-found-page/not-found-page';

export default () => {
  const routes = (
	  <Route component={App}>
	    <Route path="/" component={HomePage} name="home"/>
			<Route path="*" component={NotFoundPage} name="404"/>
	  </Route>
	);
	return routes;
}
