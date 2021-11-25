const sykmeldinger = require('./data/syfoopfolgingsplanservice.json');

function mockData(server, erLokal) {
  if (erLokal) {
    server.get('/syfooppfolgingsplanservice/api/arbeidstaker/sykmeldinger', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(sykmeldinger);
    });
  }
  server.get('/syfooppfolgingsplanservice/api/arbeidstaker/sykmeldinger', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(sykmeldinger);
  });
}

module.exports = mockData;
