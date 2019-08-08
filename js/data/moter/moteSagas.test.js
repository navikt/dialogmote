import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import {
    HENTER_MOTE,
    MOTE_HENTET,
} from './mote_actions';
import { hentMote } from './moteSagas';
import {
    get,
    hentSyfoApiUrl,
    API_NAVN,
} from '../gateway-api/gatewayApi';

describe('moteSagas', () => {
    let apiUrlBase;

    describe('hentMote', () => {
        apiUrlBase = hentSyfoApiUrl(API_NAVN.SYFOMOTEADMIN);
        const generator = hentMote({});

        it(`Skal dispatche ${HENTER_MOTE}`, () => {
            const nextPut = put({ type: HENTER_MOTE });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest hente mote', () => {
            const nextCall = call(get, `${apiUrlBase}/bruker/arbeidstaker/moter/siste`);
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it(`Skal dernest ${MOTE_HENTET}`, () => {
            const nextPut = put({
                type: MOTE_HENTET,
                data: { mitt: 'mote' },
            });
            expect(generator.next({ mitt: 'mote' }).value).to.deep.equal(nextPut);
        });
    });
});
