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
        console.log('I onProxyReq');
          var body = '';
          req.on('data', function (data) {
              data = data.toString();
              body += data;
              console.log(body);
          });
        const token = req.cookies['selvbetjening-idtoken'];
        proxyReq.setHeader('Content-Type', 'application/json');
        proxyReq.setHeader('Authorization', `Bearer ${token}`);
      },
      onProxyRes(proxyRes, req, res) {
        console.log('I onProxyRes');
        console.log('Statuskode:')
          console.log(res.statusCode)
        var body = '';
        proxyRes.on('data', function (data) {
          data = data.toString();
          body += data;
          console.log(body);
        });
      },
      logLevel: 'debug',
      changeOrigin: true,
    })
  );
};

module.exports = appProxy;
