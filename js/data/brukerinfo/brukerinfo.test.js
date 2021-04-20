import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import * as brukerinfoActions from './brukerinfo_actions';
import brukerinfo from './brukerinfo';

describe('brukerinfo', () => {
  let initiellState;

  beforeEach(() => {
    initiellState = {};
  });

  it('Håndterer sjekkerInnlogging når man ikke er innlogget fra før', () => {
    initiellState = deepFreeze({
      innstillinger: {},
      innlogging: {
        henter: false,
      },
      bruker: {},
      oppfolging: {
        data: {},
      },
    });
    const nyState = brukerinfo(initiellState, brukerinfoActions.sjekkerInnlogging());
    expect(nyState).to.deep.include({
      innlogging: {
        henter: true,
        hentingFeilet: false,
      },
    });
  });

  it('Håndterer setErUtlogget()', () => {
    initiellState = deepFreeze({
      innstillinger: {},
      innlogging: {
        erInnlogget: true,
      },
      bruker: {},
      oppfolging: {
        data: {},
      },
    });
    const nyState = brukerinfo(initiellState, brukerinfoActions.setErUtlogget());
    expect(nyState).to.deep.include({
      innlogging: {
        erInnlogget: false,
        henter: false,
        hentingFeilet: false,
      },
    });
  });

  it('Håndterer setErInnlogget()', () => {
    initiellState = deepFreeze({
      innstillinger: {},
      bruker: {},
    });
    const nyState = brukerinfo(initiellState, brukerinfoActions.setErInnlogget());
    expect(nyState).to.deep.include({
      innlogging: {
        erInnlogget: true,
        henter: false,
        hentingFeilet: false,
      },
    });
  });

  it('Håndterer sjekkInnloggingFeilet()', () => {
    initiellState = deepFreeze({
      innstillinger: {},
      bruker: {},
    });
    const nyState = brukerinfo(initiellState, brukerinfoActions.sjekkInnloggingFeilet());
    expect(nyState).to.deep.include({
      innlogging: {
        erInnlogget: false,
        henter: false,
        hentingFeilet: true,
      },
    });
  });
});
