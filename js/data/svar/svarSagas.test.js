import { expect } from 'chai';
import { call, put } from 'redux-saga/effects';
import { senderSvar, sendSvar as sendSvarAction } from './svar_actions';
import { sendSvar } from './svarSagas';
import { post } from '@/api/axios';
import { API_NAVN, hentSyfoApiUrl } from '@/api/apiUtils';

describe('svarSagas', () => {
  let apiUrlBase;

  describe('sendSvar', () => {
    apiUrlBase = hentSyfoApiUrl(API_NAVN.SYFOMOTEADMIN);
    const action = sendSvarAction('minFineMoteUuid', 'Bruker', [1, 2]);
    const generator = sendSvar(action);

    it('Skal dispatche SENDER_SVAR', () => {
      const nextPut = put(senderSvar());
      expect(generator.next().value).to.deep.equal(nextPut);
    });

    it('Skal poste svar', () => {
      const nextCall = call(post, `${apiUrlBase}/bruker/moter/minFineMoteUuid/send`, {
        valgteAlternativIder: [1, 2],
        deltakertype: 'Bruker',
      });
      expect(generator.next().value).to.deep.equal(nextCall);
    });
  });
});
