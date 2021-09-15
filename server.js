/* eslint-disable object-shorthand */
require('dotenv').config();

const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
const Promise = require('promise');
const prometheus = require('prom-client');

const proxy = require('express-http-proxy');
const cookieParser = require('cookie-parser');
const getDecorator = require('./decorator');

const envVar = ({ name, defaultValue }) => {
  const fromEnv = process.env[name];
  if (fromEnv) {
    return fromEnv;
  }
  if (typeof defaultValue === 'string') {
    return defaultValue;
  }
  throw new Error(`Missing required environment variable ${name}`);
};

const isdialogmoteHost = envVar({
  name: 'ISDIALOGMOTE_HOST',
});

// Prometheus metrics
const { collectDefaultMetrics } = prometheus;
collectDefaultMetrics({ timeout: 5000 });

const httpRequestDurationMicroseconds = new prometheus.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['route'],
  // buckets for response time from 0.1ms to 500ms
  buckets: [0.1, 5, 15, 50, 100, 200, 300, 400, 500],
});
const server = express();

const env = process.argv[2];
const settings = env === 'local' ? { isProd: false } : require('./settings.json');

server.set('views', `${__dirname}/dist`);
server.set('view engine', 'mustache');
server.engine('html', mustacheExpress());

const renderApp = (decoratorFragments) => {
  return new Promise((resolve, reject) => {
    server.render('index.html', Object.assign({}, decoratorFragments, settings), (err, html) => {
      if (err) {
        reject(err);
      } else {
        resolve(html);
      }
    });
  });
};

function nocache(req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
}

const startServer = (html) => {
  if (env === 'opplaering' || env === 'local') {
    require('./mock/mockEndepunkter')(server, env === 'local');
  } else {
    server.use(
      '/dialogmote/api/v1/arbeidstaker/brev/:uuid/les',
      cookieParser(),
      proxy(isdialogmoteHost, {
        https: true,
        parseReqBody: false,
        proxyReqOptDecorator(proxyReqOpts, srcReq) {
          const token = srcReq.cookies['selvbetjening-idtoken'];
          proxyReqOpts.headers.Authorization = `Bearer ${token}`;
          proxyReqOpts.headers['Content-Type'] = 'application/json';
          return proxyReqOpts;
        },
        proxyReqPathResolver(req) {
          const { uuid } = req;
          return `/api/v1/arbeidstaker/brev/${uuid}/les`;
        },
        proxyErrorHandler(err, res, next) {
          console.log('Error in proxy for isdialogmote', err.message);
          next(err);
        },
      })
    );

    server.use(
      '/dialogmote/api/v1/arbeidstaker/brev/:uuid/pdf',
      cookieParser(),
      proxy(isdialogmoteHost, {
        https: true,
        parseReqBody: false,
        proxyReqOptDecorator(proxyReqOpts, srcReq) {
          const token = srcReq.cookies['selvbetjening-idtoken'];
          proxyReqOpts.headers.Authorization = `Bearer ${token}`;
          proxyReqOpts.headers['Content-Type'] = 'application/json';
          return proxyReqOpts;
        },
        proxyReqPathResolver(req) {
          const { uuid } = req.params;
          return `/api/v1/arbeidstaker/brev/${uuid}/pdf`;
        },
        proxyErrorHandler(err, res, next) {
          console.log('Error in proxy for isdialogmote', err.message);
          next(err);
        },
      })
    );

    server.use(
      '/dialogmote/api/v1/arbeidstaker/brev',
      cookieParser(),
      proxy(isdialogmoteHost, {
        https: true,
        parseReqBody: false,
        proxyReqOptDecorator(proxyReqOpts, srcReq) {
          const token = srcReq.cookies['selvbetjening-idtoken'];
          proxyReqOpts.headers.Authorization = `Bearer ${token}`;
          proxyReqOpts.headers['Content-Type'] = 'application/json';
          return proxyReqOpts;
        },
        proxyReqPathResolver() {
          return '/api/v1/arbeidstaker/brev';
        },
        proxyErrorHandler(err, res, next) {
          console.log('Error in proxy for isdialogmote', err.message);
          next(err);
        },
      })
    );
  }

  server.use('/dialogmote/resources', express.static(path.resolve(__dirname, 'dist/resources')));

  server.use('/dialogmote/img', express.static(path.resolve(__dirname, 'dist/resources/img')));

  server.get(['/', '/dialogmote/?', /^\/dialogmote\/(?!(resources|img)).*$/], nocache, (req, res) => {
    res.send(html);
    httpRequestDurationMicroseconds.labels(req.route.path).observe(10);
  });

  server.get('/actuator/metrics', (req, res) => {
    res.set('Content-Type', prometheus.register.contentType);
    res.end(prometheus.register.metrics());
  });

  server.get('/health/isAlive', (req, res) => {
    res.sendStatus(200);
  });
  server.get('/health/isReady', (req, res) => {
    res.sendStatus(200);
  });

  const port = process.env.PORT || 8080;
  server.listen(port, () => {
    console.log(`App listening on port: ${port}`);
  });
};

const logError = (errorMessage, details) => {
  console.log(errorMessage, details);
};

getDecorator()
  .then(renderApp, (error) => {
    logError('Failed to get decorator', error);
    process.exit(1);
  })
  .then(startServer, (error) => {
    logError('Failed to render app', error);
  });
