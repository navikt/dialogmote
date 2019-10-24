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
        const { doHentMotebehov } = this.props;
        doHentMotebehov();
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
                            return <MotePassert deltakertype={BRUKER} />;
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
                                    deltakertype={BRUKER}
                                />
                            );
                        }
                        if (mote) {
                            return (
                                <Svarside
                                    {...this.props}
                                    deltakertype={BRUKER}
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
    hentingFeilet: PropTypes.bool,
    moteIkkeFunnet: PropTypes.bool,
    sender: PropTypes.bool,
    sendingFeilet: PropTypes.bool,
    mote: motePt,
    motebehovReducer: motebehovReducerPt,
    hentet: PropTypes.bool,
};

export function mapStateToProps(state) {
    const motebehovReducer = state.motebehov;
    return {
        mote: state.mote.data,
        moteIkkeFunnet: state.mote.moteIkkeFunnet === true,
        motebehovReducer,
        henter: state.mote.henter,
        hentet: state.mote.hentet === true,
        hentingFeilet: state.mote.hentingFeilet
        || state.ledetekster.hentingFeilet
        || false,
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
};

export default connect(mapStateToProps, actionCreators)(Container);
