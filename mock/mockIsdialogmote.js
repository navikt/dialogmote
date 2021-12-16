const referat = require('../mock/data/MVP/referatByteArray.json');

function mockSyfomoteadmin(server, erLokal) {
  if (erLokal) {
    server.get('/syk/dialogmote/api/v1/arbeidstaker/brev', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify([]));
      // res.status(400);
      // res.send('Bad request');
    });

    server.post('/syk/dialogmote/api/v1/arbeidstaker/brev/:uuid/les', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.sendStatus(200);
    });

    server.get('/syk/dialogmote/api/v1/arbeidstaker/brev/:uuid/referat', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(referat);
    });

    server.post('/syk/dialogmote/api/v1/arbeidstaker/brev/:uuid/respons', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.sendStatus(200);
    });
  }
  server.get('/syk/dialogmote/api/v1/arbeidstaker/brev', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify([]));
  });
  server.post('/syk/dialogmote/api/v1/arbeidstaker/brev/:uuid/les', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.sendStatus(200);
  });

  server.get('/syk/dialogmote/api/v1/arbeidstaker/brev/:uuid/referat', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(referat);
  });

  server.post('/syk/dialogmote/api/v1/arbeidstaker/brev/:uuid/respons', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.sendStatus(200);
  });
}

module.exports = mockSyfomoteadmin;
