import { expect } from 'chai';
import { get } from '@navikt/digisyfo-npm';
import { call, put } from 'redux-saga/effects';
import { hentLedere } from './ledereSagas';
import * as actions from './ledereActions';

const { HENTER_LEDERE, LEDERE_HENTET } = actions;

describe('ledereSagas', () => {
    describe('hentLedere', () => {
        const generator = hentLedere({});

        it('Skal dispatche HENTER_LEDERE', () => {
            const nextPut = put({ type: HENTER_LEDERE });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest hente ledere', () => {
            const nextCall = call(get, '/syforest/naermesteledere');
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal dernest lagre ledere', () => {
            const nextPut = put({
                type: LEDERE_HENTET,
                data: 'mine data',
            });
            expect(generator.next('mine data').value).to.deep.equal(nextPut);
        });
    });
});
