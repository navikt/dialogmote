import chaiEnzyme from 'chai-enzyme';
import chai from 'chai';
import deepFreeze from 'deep-freeze';
import sinon from 'sinon';
import timeout from '../../js/timeout/timeout';
import * as actions from '../../js/timeout/timeout_actions';

chai.use(chaiEnzyme());
const { expect } = chai;

describe('timeout', () => {
    let clock;
    beforeEach(() => {
        clock = sinon.useFakeTimers(new Date('2017-01-16'));
    });

    afterEach(() => {
        clock.restore();
    });

    it(`Håndterer ${actions.FORLENG_INNLOGGET_SESJON}`, () => {
        const initialState = deepFreeze({
            erInnloggetTil: new Date(2017, 0, 16, 0, 0, 0),
            brukerSnartUtlogget: false,
        });
        const action = actions.forlengInnloggetSesjon();
        const nextState = timeout(initialState, action);
        expect(nextState).to.deep.equal({
            erInnloggetTil: new Date(2017, 0, 16, 1, 30, 0),
            brukerSnartUtlogget: false,
        });
    });

    it(`Håndterer ${actions.SJEKK_INNLOGGINGSSESJON}`, () => {
        const initialState = deepFreeze({
            erInnloggetTil: new Date(2017, 0, 16, 0, 0, 0),
            brukerSnartUtlogget: false,
        });
        const action = actions.snartUtlogget();
        const nextState = timeout(initialState, action);

        expect(nextState).to.deep.equal({
            brukerSnartUtlogget: true,
            erInnloggetTil: new Date(2017, 0, 16, 0, 0, 0),
        });
    });
});
