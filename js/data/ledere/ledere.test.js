import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import ledere from './ledere';
import {
    hentLedereFeilet,
    ledereHentet,
    henterLedere,
} from './ledereActions';

describe('ledere', () => {
    it('Returnerer { data: [] } ved initializering', () => {
        const nextState = ledere();
        expect(nextState).to.deep.equal({ data: [] });
    });

    it('håndterer LEDERE_HENTET', () => {
        const initialState = deepFreeze({});
        const action = ledereHentet([{
            navn: 'Kurt Nilsen',
        }, {
            navn: 'Hans Hansen',
        }, {
            navn: 'Nina Knutsen',
        }]);
        const nextState = ledere(initialState, action);

        expect(nextState).to.deep.equal({
            henter: false,
            hentingFeilet: false,
            hentet: true,
            data: [{
                navn: 'Kurt Nilsen',
            }, {
                navn: 'Hans Hansen',
            }, {
                navn: 'Nina Knutsen',
            }],
        });
    });

    it('håndterer HENTER_LEDERE', () => {
        const initialState = deepFreeze({
            henter: false,
        });
        const action = henterLedere();
        const nextState = ledere(initialState, action);
        expect(nextState).to.deep.equal({
            data: [],
            henter: true,
            hentet: false,
            hentingFeilet: false,
        });
    });

    it('håndterer HENT_LEDERE_FEILET', () => {
        const initialState = deepFreeze({
            henter: false,
        });
        const action = hentLedereFeilet();
        const nextState = ledere(initialState, action);
        expect(nextState).to.deep.equal({
            henter: false,
            hentingFeilet: true,
            hentet: true,
            data: [],
        });
    });
});
