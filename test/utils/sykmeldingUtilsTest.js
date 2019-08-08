import sinon from 'sinon';
import chai from 'chai';
import {
    erSykmeldingAktiv,
    finnArbeidsgivereForAktiveSykmeldinger,
    finnSykmeldtSinNaermestelederNavnHosArbeidsgiver,
    sykmeldtHarNaermestelederHosArbeidsgiver,
} from '../../js/utils/sykmeldingUtils';
import {
    hentSykmeldingAktiv,
    hentSykmeldingIkkeGyldigForOppfoelging,
    hentSykmeldingUtgaatt,
    getSykmeldinger,
} from '../mock/mockSykmeldinger';
import { getLedere } from '../mock/mockLedere';

const { expect } = chai;

describe('sykmeldingUtils', () => {
    let clock;
    let sykmelding;
    let sykmeldinger;
    let sykmeldingAktiv;
    let sykmeldingUtgaatt;
    let sykmeldingUtgaattOver4mnd;
    const today = new Date('2017-01-01');
    today.setHours(0, 0, 0, 0);

    beforeEach(() => {
        sykmeldinger = getSykmeldinger;
        clock = sinon.useFakeTimers(today.getTime());
        sykmeldingAktiv = hentSykmeldingAktiv(today);
        sykmeldingUtgaatt = hentSykmeldingUtgaatt(today);
        sykmeldingUtgaattOver4mnd = hentSykmeldingIkkeGyldigForOppfoelging(today);
    });

    afterEach(() => {
        clock.restore();
    });
    const naermesteLedere = getLedere;

    describe('erSykmeldingAktiv', () => {
        it('skal returnere false med 1 sykmelding, som ikke er aktiv', () => {
            sykmelding = sykmeldingUtgaattOver4mnd;
            expect(erSykmeldingAktiv(sykmelding)).to.equal(false);
        });

        it('skal returnere true med 1 sykmelding, som er aktiv', () => {
            sykmelding = sykmeldingAktiv;
            expect(erSykmeldingAktiv(sykmelding)).to.equal(true);
        });
    });

    describe('finnArbeidsgivereForAktiveSykmeldinger', () => {
        it('skal ikke returnere arbeidsgivere, naar sykmelding er utgaatt', () => {
            sykmeldinger = [sykmeldingUtgaatt];
            expect(finnArbeidsgivereForAktiveSykmeldinger(sykmeldinger, naermesteLedere)).to.have.length(0);
        });

        it('skal returnere 1 arbeidsgiver, om det er 1 aktiv sykmelding og 2 ledere', () => {
            sykmeldinger = [sykmeldingAktiv];
            expect(finnArbeidsgivereForAktiveSykmeldinger(sykmeldinger, naermesteLedere)).to.have.length(1);
        });

        it('skal returnere 1 arbeidsgiver, når 1 sykmelding er utgaatt og 1 er aktiv', () => {
            sykmeldinger = [sykmeldingUtgaatt, sykmeldingAktiv];
            expect(finnArbeidsgivereForAktiveSykmeldinger(sykmeldinger, naermesteLedere)).to.have.length(1);
        });

        it('skal returnere 2 arbeidsgivere, når 2 sykmeldinger er aktive', () => {
            expect(finnArbeidsgivereForAktiveSykmeldinger(sykmeldinger, naermesteLedere)).to.have.length(2);
        });

        it('skal returnere 1 arbeidsgiver, når det er duplikat av arbeidsgiver', () => {
            sykmeldinger = [sykmeldingAktiv, sykmeldingAktiv];
            expect(finnArbeidsgivereForAktiveSykmeldinger(sykmeldinger, naermesteLedere)).to.have.length(1);
        });
    });

    describe('sykmeldtHarNaermestelederHosArbeidsgiver', () => {
        let virksomhetsnummer;

        it('skal returnerere false', () => {
            virksomhetsnummer = '123456781';
            expect(sykmeldtHarNaermestelederHosArbeidsgiver(virksomhetsnummer, naermesteLedere)).to.equal(false);
        });

        it('skal returnerere true', () => {
            virksomhetsnummer = '123456788';
            expect(sykmeldtHarNaermestelederHosArbeidsgiver(virksomhetsnummer, naermesteLedere)).to.equal(true);
        });
    });

    describe('finnSykmeldtSinNaermestelederNavnHosArbeidsgiver', () => {
        let virksomhetsnummer;

        it('skal ikke returnerere en naermeste leder', () => {
            virksomhetsnummer = '123456781';
            expect(finnSykmeldtSinNaermestelederNavnHosArbeidsgiver(virksomhetsnummer, naermesteLedere)).to.equal(undefined);
        });

        it('skal returnerere en naermeste leder', () => {
            virksomhetsnummer = '123456789';
            expect(finnSykmeldtSinNaermestelederNavnHosArbeidsgiver(virksomhetsnummer, naermesteLedere)).to.equal('Navn-Navnolini Navnesen');
        });
    });
});
