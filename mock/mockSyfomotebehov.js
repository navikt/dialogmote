const motebehovStatus = {
    visMotebehov: true,
    skjemaType: 'SVAR_BEHOV',
    motebehov: {
        arbeidstakerFnr: '02020212345',
        opprettetAv: '',
        virksomhetsnummer: '000111222',
        motebehovSvar: {
            harMotebehov: true,
        },
    },
};

function mockPilotEndepunkterForLokalmiljo(server) {
    server.get('/syfomotebehov/api/v2/arbeidstaker/motebehov', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(motebehovStatus));
    });

    server.post('/syfomotebehov/api/v2/arbeidstaker/motebehov', (req, res) => {
        const nyttMotebehov = req.body;

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(nyttMotebehov));
    });
}

function mockPilotEndepunkterForOpplaeringsmiljo(server) {
    server.get('/syfomotebehov/api/motebehov', (req, res) => {
        res.status(403);
        res.send();
    });
}

function mockSyfomotebehov(server, erLokal) {
    if (erLokal) {
        mockPilotEndepunkterForLokalmiljo(server);
    } else {
        mockPilotEndepunkterForOpplaeringsmiljo(server);
    }
}

module.exports = mockSyfomotebehov;
