const referat = require('../mock/data/MVP/referatByteArray.json');
const innkallelse = require('./data/MVP/innkallelse2');
const referatBrev = require('./data/MVP/referat');
const referatBrev2 = require('./data/MVP/referat2');


function mockSyfomoteadmin(server) {
  server.get('/syk/dialogmote/api/v1/arbeidstaker/brev', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify([innkallelse, referatBrev, referatBrev2]));
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

module.exports = mockSyfomoteadmin;
