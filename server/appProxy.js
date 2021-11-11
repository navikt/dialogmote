/* eslint-disable */
// const { createProxyMiddleware } = require('http-proxy-middleware');
// const winstonLogger = require('./winstonLogger');
const proxy = require('express-http-proxy');
const cookieParser = require('cookie-parser');

const isdalogmoteEnvVar = () => {
  const fromEnv = process.env.ISDIALOGMOTE_HOST;
  if (fromEnv) {
    return fromEnv;
  }

  throw new Error(`Missing required environment variable ISDIALOGMOTE_HOST`);
};

const appProxy = (server) => {
  const isdialogmoteHost = isdalogmoteEnvVar();
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
        const { uuid } = req.params;
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
  // server.use(
  //   '/dialogmote/api/v1/arbeidstaker/brev',
  //   createProxyMiddleware({
  //     target: process.env.ISDIALOGMOTE_HOST,
  //     pathRewrite: {
  //       '^/dialogmote/api/v1/arbeidstaker/brev': '/api/v1/arbeidstaker/brev',
  //     },
  //     onError: (err, req, res) => {
  //       winstonLogger.error(err);
  //       res.statusCode = 500;
  //       res.setHeader('Content-Type', 'application/json');
  //       res.write(
  //         JSON.stringify({
  //           error: `Failed to connect to API. Reason: ${err}`,
  //         })
  //       );
  //       res.end();
  //     },
  //     onProxyReq(proxyReq, req, res) {
  //       const token = req.cookies['selvbetjening-idtoken'];
  //       proxyReq.setHeader('Content-Type', 'application/json');
  //       proxyReq.setHeader('Authorization', `Bearer ${token}`);
  //     },
  //     logLevel: 'error',
  //     changeOrigin: true,
  //   })
  // );
};

module.exports = appProxy;
