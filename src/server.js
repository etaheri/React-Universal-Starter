import Express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
// import favicon from 'serve-favicon';
import compression from 'compression';
import bodyParser from 'body-parser';
import http from 'http';
import path from 'path';
import PrettyError from 'pretty-error';
import { match, createMemoryHistory } from 'react-router';
import request from 'superagent';
import favicon from 'serve-favicon';

import configureStore from './store';
import Html from './helpers/html';
import { waitAll } from './containers/app/sagas';
import Routes from './routes';

import Root from './containers/root/root';

// import Auth from 'http-auth';

const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);


// var basic = Auth.basic({
//         realm: "Login"
//     }, (username, password, callback) => {
//         // Custom authentication
//         // Use callback(error) if you want to throw async error.
//         callback(username === "admin" && password === "octoberadmin");
//     }
// );
//
// app.use(Auth.connect(basic));

// disable `X-Powered-By` HTTP header
app.disable('x-powered-by');

app.use(favicon(path.join(__dirname, '..', 'build/media/favicon.ico')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(compression());

app.all('/*', function(req, res, next) {
	res.header('Cache-Control', 'public, max-age=120');
	next();
});

const defaultCache = 3600;
app.use('/static', Express.static(path.join(__dirname, '..', 'build/static'), { maxAge: defaultCache }));
app.use('/fonts', Express.static(path.join(__dirname, '..', 'build/fonts'), { maxAge: defaultCache }));
app.use('/media', Express.static(path.join(__dirname, '..', 'build/media'), { maxAge: defaultCache }));

var mailchimpInstance   = 'us14',
    listUniqueId        = '8bc57361d0',
    mailchimpApiKey     = 'ec305c46241491460fa868b40ce0390f-us14';

app.post('/newsletter-signup', function (req, res) {
  request
	  .post('https://' + mailchimpInstance + '.api.mailchimp.com/3.0/lists/' + listUniqueId + '/members/')
	  .set('Content-Type', 'application/json;charset=utf-8')
	  .set('Authorization', 'Basic ' + new Buffer('any:' + mailchimpApiKey ).toString('base64'))
	  .send({
	    'email_address': req.body.email,
	    'status': 'subscribed',
	  })
    .end(function(err, response) {
			if (response.status === 400 && response.body.title === "Member Exists") {
				res.setHeader('Content-Type', 'application/json');
    		res.status(400).send(JSON.stringify({ msg: "This email already exists." }));
			} else if (response.status < 300) {
        res.status(200).end();
      } else {
				res.setHeader('Content-Type', 'application/json');
				res.status(400).send(JSON.stringify({ msg: "Not a valid email address." }));
      }
  });
});

app.use((req, res) => {

  const memoryHistory = createMemoryHistory();

  const store = configureStore({
  	memoryHistory,
  });

  const allRoutes = Routes(store);

  function hydrateOnClient() {
    const htmlComponent = <Html store={store} />;
    const renderedDomString = ReactDOMServer.renderToString(htmlComponent);
    res.send(`<!doctype html>\n ${renderedDomString}`);
  }

  match({ routes: allRoutes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      console.error('ROUTER ERROR:', pretty.render(error));
      res.status(500);
      hydrateOnClient();
    } else if (renderProps) {
      const rootComponent = (<Root
        store={store}
        routes={allRoutes}
        history={memoryHistory}
        renderProps={renderProps}
        type="server"
      />);

      const preloaders = renderProps.components
      .filter(component => component && component.preload)
      .map(component => component.preload(renderProps.params, req))
      .reduce((result, preloader) => result.concat(preloader), []);

      store.runSaga(waitAll(preloaders)).done.then(() => {

        global.navigator = { userAgent: req.headers['user-agent'] };

        const htmlComponent = <Html component={rootComponent} store={store}/>;

        const renderedDomString = ReactDOMServer.renderToString(htmlComponent);
        res.status(200).send(`<!doctype html>\n ${renderedDomString}`);
      }).catch((e) => {
        console.log(e.stack);
      });
    } else {
      res.status(404).send('Not found');
    }
  });
});


server.listen(process.env.PORT || '3000', (err) => {
	if (err) {
		console.error(err);
	}
	console.info('==> 💻  Open http://%s:%s in a browser to view the app.', process.env.HOST || 'localhost', process.env.PORT || '8080');
});
