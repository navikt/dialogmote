const motebehovSvar = {
  arbeidstakerFnr: '02020212345',
  opprettetAv: '',
  virksomhetsnummer: '000111222',
  motebehovSvar: {
    harMotebehov: true,
    forklaring: 'Jeg ønsker at den som sykmelder meg, også skal delta i møtet (valgfri). Vondt i hodet',
  },
  opprettetDato: '2019-11-08T12:35:37.669+01:00',
};

const svarMotebehovSvar = {
  arbeidstakerFnr: '02020212345',
  opprettetAv: '',
  virksomhetsnummer: '000111222',
  motebehovSvar: {
    harMotebehov: true,
    forklaring: 'Vondt i magen',
  },
  opprettetDato: '2019-11-08T12:35:37.669+01:00',
};

const motebehovStatusMeldBehov = {
  visMotebehov: true,
  skjemaType: 'MELD_BEHOV',
  motebehov: null,
};
const motebehovStatusMeldBehovSvar = {
  visMotebehov: true,
  skjemaType: 'MELD_BEHOV',
  motebehov: motebehovSvar,
};

const motebehovStatusSvarUnavailable = {
  visMotebehov: true,
  skjemaType: 'SVAR_BEHOV',
  motebehov: null,
};

const motebehovStatusSvarBehov = {
  visMotebehov: true,
  skjemaType: 'SVAR_BEHOV',
  motebehov: null,
};
const motebehovStatusSvarBehovSvar = {
  visMotebehov: true,
  skjemaType: 'SVAR_BEHOV',
  motebehov: svarMotebehovSvar,
};

const ingenMotebehov = {
  visMotebehov: false,
  skjemaType: null,
  motebehov: null,
};

const motebehovStatusEnum = {
  SVAR_BEHOV: 'SVAR_BEHOV',
  SVAR_BEHOV_SVAR: 'SVAR_BEHOV_SVAR',
  MELD_BEHOV: 'MELD_BEHOV',
  MELD_BEHOV_SVAR: 'MELD_BEHOV_SVAR',
  BAD_REQUEST: 'BAD_REQUEST',
  INGEN_MOTEBEHOV: 'INGEN_MOTEBEHOV',
};

function getMotebehovStatus(type, res) {
  switch (type) {
    case motebehovStatusEnum.MELD_BEHOV: {
      return motebehovStatusMeldBehov;
    }
    case motebehovStatusEnum.MELD_BEHOV_SVAR: {
      return motebehovStatusMeldBehovSvar;
    }
    case motebehovStatusEnum.SVAR_BEHOV: {
      return motebehovStatusSvarBehov;
    }
    case motebehovStatusEnum.SVAR_BEHOV_SVAR: {
      return motebehovStatusSvarBehovSvar;
    }
    case motebehovStatusEnum.INGEN_MOTEBEHOV: {
      return ingenMotebehov;
    }
    case motebehovStatusEnum.BAD_REQUEST: {
      res.status(400);
      return 'Bad request';
    }
    default: {
      return motebehovStatusSvarUnavailable;
    }
  }
}

function mockPilotEndepunkter(server) {
  server.get('/syk/dialogmote/api/motebehov', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(getMotebehovStatus(motebehovStatusEnum.INGEN_MOTEBEHOV, res)));
  });

  server.post('/syk/dialogmote/api/motebehov', (req, res) => {
    const nyttMotebehov = req.body;

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(nyttMotebehov));
  });
}

function mockSyfomotebehov(server) {
  mockPilotEndepunkter(server);
}

module.exports = mockSyfomotebehov;
