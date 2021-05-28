const mockInnkallelseMVP = require('./moteinnkallelseMVP');
const referat = require('../mock/data/MVP/referatByteArray.json');

function mockSyfomoteadmin(server, erLokal) {
  if (erLokal) {
    server.get('/dialogmote/api/v1/arbeidstaker/brev', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(mockInnkallelseMVP));
    });

    server.post('/dialogmote/api/v1/arbeidstaker/brev/:uuid/les', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.sendStatus(200);
    });

    server.get('/dialogmote/api/v1/arbeidstaker/brev/:uuid/referat', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(referat);
    });
  }
}

module.exports = mockSyfomoteadmin;
