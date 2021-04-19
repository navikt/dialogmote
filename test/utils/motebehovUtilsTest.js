import chai from 'chai';
import sinon from 'sinon';
import {
  MOTEBEHOV_SKJEMATYPE,
  skalViseMotebehovKvittering,
  erMotebehovTilgjengelig,
} from '../../js/utils/motebehovUtils';

const { expect } = chai;

describe('motebehovUtils', () => {
  let clock;
  beforeEach(() => {
    const dagensDato = new Date('2019-06-11');
    clock = sinon.useFakeTimers(dagensDato.getTime());
  });

  afterEach(() => {
    clock.restore();
  });

  describe('erMotebehovTilgjengelig', () => {
    let motebehovReducer;
    beforeEach(() => {
      const dagensDato = new Date('2019-06-11');
      clock = sinon.useFakeTimers(dagensDato.getTime());
    });

    it('skal returnere false, henting av motebehov er forbudt fra syfomotebehov', () => {
      motebehovReducer = {
        hentingForbudt: true,
      };
      expect(erMotebehovTilgjengelig(motebehovReducer)).to.equal(false);
    });

    it('skal returnere false, om visMotebehov er false', () => {
      motebehovReducer = {
        data: {
          visMotebehov: false,
          skjemaType: null,
          motebehov: null,
        },
      };
      expect(erMotebehovTilgjengelig(motebehovReducer)).to.equal(false);
    });

    it('skal returnere false, om visMotebehov er true og skjemaType=MELD_BEHOV', () => {
      motebehovReducer = {
        data: {
          visMotebehov: true,
          skjemaType: MOTEBEHOV_SKJEMATYPE.MELD_BEHOV,
          motebehov: null,
        },
      };
      expect(erMotebehovTilgjengelig(motebehovReducer)).to.equal(true);
    });

    it('skal returnere false, om visMotebehov er true og skjemaType!=SVAR_BEHOV', () => {
      motebehovReducer = {
        data: {
          visMotebehov: true,
          skjemaType: null,
          motebehov: null,
        },
      };
      expect(erMotebehovTilgjengelig(motebehovReducer)).to.equal(false);
    });

    it('skal returnere true, om visMotebehov er true og skjemaType=SVAR_BEHOV', () => {
      motebehovReducer = {
        data: {
          visMotebehov: true,
          skjemaType: MOTEBEHOV_SKJEMATYPE.SVAR_BEHOV,
          motebehov: null,
        },
      };
      expect(erMotebehovTilgjengelig(motebehovReducer)).to.equal(true);
    });
  });

  describe('skalViseMotebehovKvittering', () => {
    const motebehovSvar = {
      harMotebehov: true,
    };

    it('skal returnere false dersom henting av motebehov feilet', () => {
      const motebehovReducer = {
        hentingFeilet: true,
      };

      const resultat = skalViseMotebehovKvittering(motebehovReducer);
      const forventet = false;

      expect(resultat).to.equal(forventet);
    });

    it('skal returnere false, om visMotevehov = false', () => {
      const motebehovReducer = {
        data: {
          visMotebehov: false,
          skjemaType: MOTEBEHOV_SKJEMATYPE.SVAR_BEHOV,
          motebehov: {
            opprettetDato: new Date(),
            aktorId: 'sykmeldtAktorId',
            opprettetAv: 'veilederAktorId',
            motebehovSvar,
          },
        },
      };

      const resultat = skalViseMotebehovKvittering(motebehovReducer);
      const forventet = false;
      expect(resultat).to.equal(forventet);
    });

    it('skal returnere false, om visMotevehov=true, skjemaType=MELD_BEHOV med motebehovSvar', () => {
      const motebehovReducer = {
        data: {
          visMotebehov: true,
          skjemaType: MOTEBEHOV_SKJEMATYPE.MELD_BEHOV,
          motebehov: {
            opprettetDato: new Date(),
            aktorId: 'sykmeldtAktorId',
            opprettetAv: 'veilederAktorId',
            motebehovSvar,
          },
        },
      };

      const resultat = skalViseMotebehovKvittering(motebehovReducer);
      const forventet = true;
      expect(resultat).to.equal(forventet);
    });

    it('skal returnere false, om visMotevehov=true, skjemaType=MELD_BEHOV uten motebehovSvar', () => {
      const motebehovReducer = {
        data: {
          visMotebehov: true,
          skjemaType: MOTEBEHOV_SKJEMATYPE.MELD_BEHOV,
          motebehov: null,
        },
      };

      const resultat = skalViseMotebehovKvittering(motebehovReducer);
      const forventet = false;
      expect(resultat).to.equal(forventet);
    });

    it('skal returnere true, om visMotevehov=true, skjemaType=SVAR_BEHOV med motebehovSvar', () => {
      const motebehovReducer = {
        data: {
          visMotebehov: true,
          skjemaType: MOTEBEHOV_SKJEMATYPE.SVAR_BEHOV,
          motebehov: {
            opprettetDato: new Date(),
            aktorId: 'sykmeldtAktorId',
            opprettetAv: 'veilederAktorId',
            motebehovSvar,
          },
        },
      };

      const resultat = skalViseMotebehovKvittering(motebehovReducer);
      const forventet = true;
      expect(resultat).to.equal(forventet);
    });

    it('skal returnere false, om visMotevehov=true, skjemaType=SVAR_BEHOV uten motebehovSvar', () => {
      const motebehovReducer = {
        data: {
          visMotebehov: true,
          skjemaType: MOTEBEHOV_SKJEMATYPE.SVAR_BEHOV,
          motebehov: null,
        },
      };

      const resultat = skalViseMotebehovKvittering(motebehovReducer);
      const forventet = false;
      expect(resultat).to.equal(forventet);
    });
  });
});
