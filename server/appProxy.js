/* eslint-disable */
const { createProxyMiddleware } = require('http-proxy-middleware');

const appProxy = (server) => {
  server.use(
    '/syk/dialogmote/api/v1/arbeidstaker/brev',
    createProxyMiddleware({
      target: process.env.ISDIALOGMOTE_HOST,
      pathRewrite: {
        '^/syk/dialogmote/api/v1/arbeidstaker/brev': '/api/v1/arbeidstaker/brev',
      },
      onError: (err, req, res) => {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.write(
          JSON.stringify({
            error: `Failed to connect to API. Reason: ${err}`,
          })
        );
        res.end();
      },
      onProxyReq(proxyReq, req, res) {
        const token = req.cookies['selvbetjening-idtoken'];
        proxyReq.setHeader('Content-Type', 'application/json');
        proxyReq.setHeader('Authorization', `Bearer ${token}`);
      },
      logLevel: 'error',
      changeOrigin: true,
    })
  );

  server.use(
    '/syk/dialogmote/api/motebehov',
    createProxyMiddleware({
      target: process.env.SYFOMOTEBEHOV_HOST,
      pathRewrite: {
        '^/syk/dialogmote/api/motebehov': '/syfomotebehov/api/v2/arbeidstaker/motebehov',
      },
      onError: (err, req, res) => {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.write(
          JSON.stringify({
            error: `Failed to connect to API. Reason: ${err}`,
          })
        );
        res.end();
      },
      logLevel: 'error',
      changeOrigin: true,
    })
  );

  server.use(
    '/syk/dialogmote/api/moteadmin',
    createProxyMiddleware({
      target: process.env.SYFOMOTEADMIN_HOST,
      pathRewrite: {
        '^/syk/dialogmote/api/moteadmin': '/syfomoteadmin/api/bruker',
      },
      onError: (err, req, res) => {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.write(
          JSON.stringify({
            error: `Failed to connect to API. Reason: ${err}`,
          })
        );
        res.end();
      },
      logLevel: 'error',
      changeOrigin: true,
    })
  );
};

module.exports = appProxy;
