const mockData = require('./mockData');
const enums = require('./mockDataEnums');

const MILLISEKUNDER_PER_DAG = 86400000;
const leggTilDagerPaDato = (dato, dager) => {
    const nyDato = new Date(dato);
    nyDato.setTime(nyDato.getTime() + (dager * MILLISEKUNDER_PER_DAG));
    return new Date(nyDato);
};

const OPPFOLGINGSFORLOP_TYPE = {
    MOTEBEHOV_AKTIV: {
        fomUke: 16,
        tomUke: 17,
    },
    MOTEBEHOV_INAKTIV: {
        fomUke: 15,
        tomUke: 17,
    },
};

const getPerioder = (type) => {
    const perioder = mockData[enums.PERIODER];
    const today = new Date();
    return [
        {
            ...perioder[0],
            fom: leggTilDagerPaDato(today, -(type.fomUke * 7)).toJSON(),
            tom: leggTilDagerPaDato(today, ((type.tomUke - type.fomUke) * 7)).toJSON(),
        },
    ];
};

const mockSyforest = (server) => {
    server.get('/syforest/sykmeldinger', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[enums.SYKMELDINGER]));
    });

    server.get('/syforest/naermesteledere', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[enums.NAERMESTELEDERE]));
    });

    server.get('/syforest/sykeforloep/siste/perioder', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(getPerioder(OPPFOLGINGSFORLOP_TYPE.MOTEBEHOV_AKTIV)));
    });
};

module.exports = mockSyforest;
