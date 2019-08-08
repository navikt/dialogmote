import chai from 'chai';
import React from 'react';
import { mount } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import getSykmelding from '../../../test/mock/mockSykmeldinger';
import { Sykmeldingstatus } from './SykmeldingStatuspanelOpplysning';

chai.use(chaiEnzyme());
const { expect } = chai;

describe('StatusOpplysning', () => {
    it('Skal vise hjelpetekst for status === TIL_SENDING', () => {
        const comp = mount(<Sykmeldingstatus sykmelding={getSykmelding({ status: 'TIL_SENDING' })} />);
        expect(comp.find(Hjelpetekst)).to.have.length(1);
    });

    it('Skal ikke vise hjelpetekst for status !== TIL_SENDING', () => {
        const comp = mount(<Sykmeldingstatus sykmelding={getSykmelding({ status: 'SENDT' })} />);
        expect(comp.find(Hjelpetekst)).to.have.length(0);
    });
});
