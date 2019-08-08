import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import * as hendelserActions from './hendelserActions';
import hendelser from './hendelser';

describe('hendelser', () => {
    let state;

    it('Skal returnere initiellState dersom det ikke sendes inn noe action', () => {
        const expectedState = {
            henter: false,
            hentingFeilet: false,
            data: [],
            hentet: false,
        };
        state = hendelser();
        expect(state).to.deep.equal(expectedState);
    });

    it('Skal sette henter til true når det hentes', () => {
        const action = hendelserActions.henterHendelser();
        state = hendelser(deepFreeze(state), action);
        expect(state).to.deep.equal({
            henter: true,
            hentingFeilet: false,
            hentet: false,
            data: [],
        });
    });

    it('Skal sette hentingFeilet til true dersom henting feiler', () => {
        const action = hendelserActions.hentHendelserFeilet();
        state = hendelser(deepFreeze(state), action);
        expect(state).to.deep.equal({
            henter: false,
            hentingFeilet: true,
            data: [],
            hentet: true,
        });
    });

    it('Skal sette data til hendelser ved hendelserHentet()', () => {
        const hendelse = {
            type: 'min_hendelse',
            id: '123',
            inntruffetdato: '2017-08-14',
        };
        const action = hendelserActions.hendelserHentet([hendelse]);
        state = hendelser(deepFreeze(state), action);
        expect(state).to.deep.equal({
            henter: false,
            hentingFeilet: false,
            data: [{
                type: 'min_hendelse',
                id: '123',
                inntruffetdato: new Date('2017-08-14'),
            }],
            hentet: true,
        });
    });
});
