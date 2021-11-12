import { expect } from 'chai';
import { call, put } from 'redux-saga/effects';
import { get, post } from '@/api/axios';
import { API_NAVN, hentSyfoApiUrl } from '@/api/apiUtils';
import { hentMotebehov, svarMotebehov } from './motebehovSagas';
import {
  HENT_MOTEBEHOV_HENTER,
  HENT_MOTEBEHOV_HENTET,
  SVAR_MOTEBEHOV_SENDER,
  SVAR_MOTEBEHOV_SENDT,
} from './motebehov_actions';

describe('motebehovSagas', () => {
  let apiUrlBase;

  describe('hentMotebehov', () => {
    apiUrlBase = `${hentSyfoApiUrl(API_NAVN.SYFOMOTEBEHOV)}/v2/arbeidstaker`;
    const generator = hentMotebehov({
      id: 1,
    });

    it(`Skal dispatche ${HENT_MOTEBEHOV_HENTER}`, () => {
      const nextPut = put({
        type: HENT_MOTEBEHOV_HENTER,
      });
      expect(generator.next().value).to.deep.equal(nextPut);
    });

    it('Skal dernest kalle resttjenesten', () => {
      const nextCall = call(get, `${apiUrlBase}/motebehov`);
      expect(generator.next().value).to.deep.equal(nextCall);
    });

    it(`Skal dernest sette ${HENT_MOTEBEHOV_HENTET}`, () => {
      const nextPut = put({
        type: HENT_MOTEBEHOV_HENTET,
        data: [{ motebehovSvar: null }],
      });
      expect(generator.next([{ motebehovSvar: null }]).value).to.deep.equal(nextPut);
    });
  });

  describe('svarMotebehov', () => {
    const generator = svarMotebehov({
      svar: {
        harMotebehov: 'true',
        forklaring: 'forklaring',
      },
    });

    it(`Skal dispatche ${SVAR_MOTEBEHOV_SENDER}`, () => {
      const nextPut = put({
        type: SVAR_MOTEBEHOV_SENDER,
      });
      expect(generator.next().value).to.deep.equal(nextPut);
    });

    it('Skal dernest kalle resttjenesten', () => {
      const nextCall = call(post, `${apiUrlBase}/motebehov`, {
        harMotebehov: true,
        forklaring: 'forklaring',
      });
      expect(generator.next().value).to.deep.equal(nextCall);
    });

    it(`Skal dernest sette ${SVAR_MOTEBEHOV_SENDT}`, () => {
      const nextPut = put({
        type: SVAR_MOTEBEHOV_SENDT,
        svar: {
          harMotebehov: true,
          forklaring: 'forklaring',
        },
      });
      expect(generator.next().value).to.deep.equal(nextPut);
    });
  });
});
