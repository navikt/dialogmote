/* eslint arrow-body-style: ["error", "as-needed"] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    brodsmule as brodsmulePt,
    motebehovReducerPt,
    moteplanleggerDeltakerPt,
    motePt,
} from '../propTypes';
import Side from './Side';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import AvbruttMote from '../components/moter/moteplanlegger/AvbruttMote';
import BekreftetKvittering from '../components/moter/moteplanlegger/BekreftetKvittering';
import Kvittering from '../components/moter/moteplanlegger/Kvittering';
import MotePassert from '../components/moter/moteplanlegger/MotePassert';
import Svarside from '../components/moter/moteplanlegger/Svarside';
import {
    hentMote,
} from '../data/moter/mote_actions';
import {
    AVBRUTT,
    BEKREFTET,
    MOTESTATUS,
    erMotePassert,
    getSvarsideModus,
} from '../utils/moteUtils';
import { BRUKER } from '../enums/moteplanleggerDeltakerTyper';
import { sendSvar } from '../data/svar/svar_actions';
import { hentMotebehov } from '../data/motebehov/motebehov_actions';
import { hentOppfolgingsforlopsPerioder } from '../data/oppfolgingsforlopsperioder/oppfolgingsforlopsPerioder_actions';
import {
    finnOgHentManglendeOppfolgingsforlopsPerioder,
    finnOppfolgingsforlopsPerioderForAktiveSykmeldinger,
    finnVirksomheterMedAktivSykmelding,
    hentOppfolgingsPerioderFeilet,
} from '../utils/oppfolgingsforlopsperioderUtils';
import { hentDineSykmeldinger } from '../sykmeldinger/data/dine-sykmeldinger/dineSykmeldingerActions';

const tekster = {
    brodsmuler: {
        dittSykefravaer: 'Ditt sykefravær',
        dialogmote: 'Dialogmøte',
    },
    sideTittel: 'Dialogmøte',
};

export class Container extends Component {
    componentWillMount() {
        const { doHentMote } = this.props;
        doHentMote();
    }

    componentDidMount() {
        const {
            doHentMotebehov,
            doHentDineSykemeldinger,
        } = this.props;
        doHentMotebehov();
        doHentDineSykemeldinger();
    }

    componentWillReceiveProps(nextProps) {
        const {
            doHentOppfolgingsforlopsPerioder,
            oppfolgingsforlopsPerioderReducerListe,
            virksomhetsnrListe,
        } = nextProps;

        finnOgHentManglendeOppfolgingsforlopsPerioder(doHentOppfolgingsforlopsPerioder, oppfolgingsforlopsPerioderReducerListe, virksomhetsnrListe);
    }

    render() {
        const {
            henter,
            hentet,
            mote,
            brodsmuler,
            hentingFeilet,
            moteIkkeFunnet,
            doSendSvar,
        } = this.props;
        const modus = getSvarsideModus(mote);
        return (
            <Side
                tittel={tekster.sideTittel}
                brodsmuler={brodsmuler}
                laster={henter || !hentet}
            >
                {
                    (() => {
                        if (henter) {
                            return <AppSpinner />;
                        }
                        if (hentingFeilet) {
                            return <Feilmelding />;
                        }
                        if (moteIkkeFunnet) {
                            return (
                                <Feilmelding
                                    tittel="Du har ingen møteforespørsel for øyeblikket"
                                    melding="Er du sikker på at du er på riktig side?"
                                />
                            );
                        }
                        if (erMotePassert(mote)) {
                            return <MotePassert />;
                        }
                        if (modus === BEKREFTET) {
                            return (
                                <BekreftetKvittering
                                    mote={mote}
                                    deltakertype={BRUKER}
                                />
                            );
                        }
                        if (modus === MOTESTATUS) {
                            return (
                                <Kvittering
                                    mote={mote}
                                />
                            );
                        }
                        if (modus === AVBRUTT) {
                            return (
                                <AvbruttMote
                                    mote={mote}
                                />
                            );
                        }
                        if (mote) {
                            return (
                                <Svarside
                                    {...this.props}
                                    sendSvar={doSendSvar}
                                />
                            );
                        }
                        return <Feilmelding />;
                    })()
                }
            </Side>
        );
    }
}

Container.propTypes = {
    henter: PropTypes.bool,
    fantIkkeDeltaker: PropTypes.bool,
    deltaker: moteplanleggerDeltakerPt,
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    doHentMote: PropTypes.func,
    doSendSvar: PropTypes.func,
    doHentMotebehov: PropTypes.func,
    doHentOppfolgingsforlopsPerioder: PropTypes.func,
    doHentDineSykemeldinger: PropTypes.func,
    oppfolgingsforlopsPerioderReducerListe: PropTypes.arrayOf(PropTypes.shape()),
    hentingFeilet: PropTypes.bool,
    moteIkkeFunnet: PropTypes.bool,
    sender: PropTypes.bool,
    sendingFeilet: PropTypes.bool,
    mote: motePt,
    motebehovReducer: motebehovReducerPt,
    hentet: PropTypes.bool,
    virksomhetsnrListe: PropTypes.arrayOf(PropTypes.string),
};

export function mapStateToProps(state) {
    const motebehovReducer = state.motebehov;
    const ledereReducer = state.ledere;
    const dineSykmeldingerReducer = state.dineSykmeldinger;
    const virksomhetsnrListe = finnVirksomheterMedAktivSykmelding(dineSykmeldingerReducer.data, ledereReducer.data);
    const oppfolgingsforlopsPerioderReducerListe = finnOppfolgingsforlopsPerioderForAktiveSykmeldinger(state, virksomhetsnrListe);
    const hentOppfolgingsforlopsPerioderFeilet = hentOppfolgingsPerioderFeilet(oppfolgingsforlopsPerioderReducerListe);
    return {
        mote: state.mote.data,
        moteIkkeFunnet: state.mote.moteIkkeFunnet === true,
        motebehovReducer,
        oppfolgingsforlopsPerioderReducerListe,
        virksomhetsnrListe,
        henter: state.mote.henter,
        hentet: state.mote.hentet === true,

        hentingFeilet: state.mote.hentingFeilet
        || hentOppfolgingsforlopsPerioderFeilet,
        sender: state.svar.sender,
        sendingFeilet: state.svar.sendingFeilet,
        brodsmuler: [{
            tittel: tekster.brodsmuler.dittSykefravaer,
            sti: '/sykefravaer',
            erKlikkbar: true,
        }, {
            tittel: tekster.brodsmuler.dialogmote,
        }],
    };
}

const actionCreators = {
    doHentMote: hentMote,
    doHentMotebehov: hentMotebehov,
    doSendSvar: sendSvar,
    doHentDineSykemeldinger: hentDineSykmeldinger,
    doHentOppfolgingsforlopsPerioder: hentOppfolgingsforlopsPerioder,
};

export default connect(mapStateToProps, actionCreators)(Container);
