import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import { getAjax } from '@navikt/digisyfo-npm';
import { sjekkInnlogging } from './brukerinfoSagas';
import { setErInnlogget, sjekkerInnlogging } from './brukerinfo_actions';

describe('brukerinfoSagas', () => {
  describe('sjekkInnlogging', () => {
    const generator = sjekkInnlogging();

    it('Skal dispatche SJEKKER_INNLOGGING', () => {
      const nextPut = put(sjekkerInnlogging());
      expect(generator.next().value).to.deep.equal(nextPut);
    });

    it('Skal dernest sjekke om brukeren er innlogget', () => {
      const nextCall = call(getAjax, '/dialogmote/');
      expect(generator.next().value).to.deep.equal(nextCall);
    });

    it('Skal dernest sette status for innlogging', () => {
      const nextPut = put(setErInnlogget());
      expect(generator.next().value).to.deep.equal(nextPut);
    });
  });
});
