const mockData = require('./mockData');
const enums = require('./mockDataEnums');

function mockSyfomoteadmin(server) {
  server.get('/syk/dialogmote/api/moteadmin/arbeidstaker/moter/siste', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    //res.send(JSON.stringify(mockData[enums.SISTE]));
    res.status(404);
    res.send('NotFound');
  });
}

module.exports = mockSyfomoteadmin;
