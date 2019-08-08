import chai from 'chai';
import React from 'react';
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import Sykmeldingteaser from './Sykmeldingteaser';
import getSykmelding from '../../../test/mock/mockSykmeldinger';

chai.use(chaiEnzyme());
const { expect } = chai;

describe('Sykmeldingteaser', () => {
    it('Viser datoer', () => {
        const sykmelding = {
            mulighetForArbeid: {
                perioder: [{
                    fom: '2016-02-02',
                    tom: '2016-02-16',
                    grad: 100,
                }],
            },
        };
        const teaser = mount(<Sykmeldingteaser sykmelding={getSykmelding(sykmelding)} />);
        expect(teaser.find('.js-title').text()).to.contain('2. – 16. februar 2016');
        expect(teaser.find('.js-title').text()).to.contain('Sykmelding');
    });

    it('Viser arbeidsgiver dersom arbeidsgiver finnes', () => {
        const teaser = mount(<Sykmeldingteaser sykmelding={getSykmelding({
            mulighetForArbeid: {
                perioder: [{
                    fom: '2016-02-02',
                    tom: '2016-02-16',
                    grad: 100,
                }],
            },
            innsendtArbeidsgivernavn: 'Arbeidsgiver AS',
        })} />);

        expect(teaser.find('.js-periode').text()).to.contain('Arbeidsgiver AS');
    });

    it('Viser ikke arbeidsgiver dersom arbeidsgiver ikke finnes', () => {
        const teaser = mount(<Sykmeldingteaser sykmelding={getSykmelding({
            innsendtArbeidsgivernavn: null,
        })} />);
        expect(teaser.text()).to.not.contain('fra null');
    });

    it('Viser ikke grad dersom grad ikke finnes', () => {
        const teaser = mount(<Sykmeldingteaser sykmelding={getSykmelding({
            mulighetForArbeid: {
                perioder: [{
                    fom: '2016-02-02',
                    tom: '2016-02-16',
                    grad: null,
                }],
            },
        })} />);
        expect(teaser.text()).to.not.contain('Du er null %');
    });

    it('Skal være et <article />-element', () => {
        const teaser = shallow(<Sykmeldingteaser sykmelding={getSykmelding({
            innsendtArbeidsgivernavn: 'Arbeidsgiver AS',
            mulighetForArbeid: {
                perioder: [{
                    fom: '2016-02-02',
                    tom: '2016-02-16',
                    grad: 100,
                }],
            },
        })} />);
        expect(teaser).to.have.tagName('article');
    });
});
