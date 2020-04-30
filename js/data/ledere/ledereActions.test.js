import { expect } from 'chai';

import * as actions from './ledereActions';

describe('ledere_actions', () => {
    it('Har en hentLedere()-funksjon', () => {
        const res = actions.hentLedere();
        expect(res).to.deep.equal({
            type: actions.HENT_LEDERE_FORESPURT,
        });
    });
});
