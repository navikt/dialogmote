/* eslint-disable */
const { createProxyMiddleware, fixRequestBody } = require('http-proxy-middleware');

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
};

module.exports = appProxy;
