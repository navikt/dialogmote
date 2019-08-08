const path = require('path');
const fs = require('fs');
const enums = require('./mockDataEnums');

const mockData = {};

const lastFilTilMinne = (filnavn) => {
    fs.readFile(path.join(__dirname, `/data/${filnavn}.json`), (err, data) => {
        if (err) throw err;
        mockData[filnavn] = JSON.parse(data.toString());
    });
};

lastFilTilMinne(enums.MOTEBEHOV);
lastFilTilMinne(enums.NAERMESTELEDERE);
lastFilTilMinne(enums.SYFOUNLEASH);
lastFilTilMinne(enums.SYKMELDINGER);
lastFilTilMinne(enums.TEKSTER);
lastFilTilMinne(enums.PERIODER);
lastFilTilMinne(enums.SISTE);

module.exports = mockData;
