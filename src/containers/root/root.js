import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, RouterContext } from 'react-router';

import Helmet from 'react-helmet';

export default class Root extends Component {

  render() {
    const { store, history, routes, type, renderProps } = this.props;
    return (
      <Provider store={store}>
        <div>
            <Helmet
                defaultTitle="Universal"
                titleTemplate="%s - Universal"
            />
          {type === 'server'
            ? <RouterContext {...renderProps} type={type} />
            : <Router history={history} routes={routes}  />
            }
        </div>
      </Provider>
    );
  }
}
