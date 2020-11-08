const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app
    .use(
      createProxyMiddleware('/api', {
        target: 'http://localhost:4000',
        changeOrigin: true,
      })
    )
    .use(
      createProxyMiddleware('/v1', {
        target: 'https://openapi.naver.com',
        changeOrigin: true,
      })
    );
};
