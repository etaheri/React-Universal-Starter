import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';
import AssetManifest from '../../build/asset-manifest';

import { selectMenuSideActive, selectglobalSearchActive } from '../containers/ui/selectors';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.a
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
class Html extends Component {
  render() {
    const { component, store, menuSideActive, globalSearchActive} = this.props;
    console.log(menuSideActive, globalSearchActive)
		const content = component ? ReactDOM.renderToStaticMarkup(component) : '';

		const head = Helmet.rewind();

		const scriptBundle = '/' + AssetManifest['main.js'];
		const cssBundle = '/' + AssetManifest['main.css'];

	  return (
      <html lang="en-us">
        <head>
					<link rel="shortcut icon" href="/media/favicon.ico"/>

					{ head.title.toComponent() }
					{ head.meta.toComponent() }
					{ head.link.toComponent() }

          <meta name="viewport" content="width=device-width, initial-scale=1" />
					<link href={ cssBundle } media="screen, projection" rel="stylesheet" type="text/css" charSet="UTF-8" />
					<script dangerouslySetInnerHTML={{ __html: `
						(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
						(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
						m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
						})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
						ga('create', 'GOOGLEID', 'auto');
					`}} />
			 	 </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={{ __html: content }}/>
          <script dangerouslySetInnerHTML={{ __html: `window.__data=${serialize(store.getState())}; window.__apienv="${process.env.API_ENV}";` }} charSet="UTF-8" />
          <script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>
          <script src={ scriptBundle } charSet="UTF-8" />
				</body>
      </html>
    );
  }
}

Html.propTypes = {
  assets: PropTypes.object,
  component: PropTypes.node,
  store: PropTypes.object
};

export default Html;
