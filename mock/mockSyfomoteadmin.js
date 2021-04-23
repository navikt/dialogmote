const { siste } = require('./data/siste');

function mockSyfomoteadmin(server) {
  server.get('/syfomoteadmin/api/bruker/arbeidstaker/moter/siste', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(siste));
  });
}

module.exports = mockSyfomoteadmin;
