import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import getContextRoot from '../utils/getContextRoot';
import history from '../history';
import Side from './Side';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import DialogmoterInnhold from '../components/moter/DialogmoterInnhold';
import {
    brodsmule as brodsmulePt,
    motebehovReducerPt,
} from '../propTypes';
import { hentDineSykmeldinger } from '../sykmeldinger/data/dine-sykmeldinger/dineSykmeldingerActions';
import { hentLedere } from '../landingsside/data/ledere/ledereActions';
import { hentMote } from '../data/moter/mote_actions';
import { hentMotebehov } from '../data/motebehov/motebehov_actions';
import { hentOppfolgingsforlopsPerioder } from '../data/oppfolgingsforlopsperioder/oppfolgingsforlopsPerioder_actions';
import {
    forsoektHentetDineSykmeldinger,
    forsoektHentetLedere,
    forsoktHentetMote,
    henterEllerHarHentetLedere,
} from '../utils/reducerUtils';
import { getMote } from '../utils/moteUtils';
import {
    finnVirksomhetnrListeMedSkalViseMotebehov,
    skalViseMotebehovKvittering,
    skalViseMotebehovMedOppfolgingsforlopListe,
} from '../utils/motebehovUtils';
import {
    finnOgHentManglendeOppfolgingsforlopsPerioder,
    finnOppfolgingsforlopsPerioderForAktiveSykmeldinger,
    finnVirksomheterMedAktivSykmelding,
    forsoektHentetOppfolgingsPerioder,
    hentOppfolgingsPerioderFeilet,
} from '../utils/oppfolgingsforlopsperioderUtils';

const tekster = {
    brodsmuler: {
        dittSykefravaer: 'Ditt sykefravær',
        dialogmote: 'Dialogmøter',
    },
    sideTittel: 'Dialogmøter',
};

class Container extends Component {
    componentDidMount() {
        const {
            actions,
            skalHenteLedere,
            skalViseMotebehov,
            harForsoektHentetAlt,
            oppfolgingsforlopsPerioderReducerListe,
            virksomhetsnrListe,
        } = this.props;

        actions.hentDineSykmeldinger();
        actions.hentMote();
        actions.hentMotebehov();
        finnOgHentManglendeOppfolgingsforlopsPerioder(actions.hentOppfolgingsforlopsPerioder, oppfolgingsforlopsPerioderReducerListe, virksomhetsnrListe);

        if (skalHenteLedere) {
            actions.hentLedere();
        }

        if (harForsoektHentetAlt && skalViseMotebehov === false) {
            history.push(`${getContextRoot()}/mote`);
        }
    }

    componentWillReceiveProps(nextProps) {
        const {
            harForsoektHentetAlt,
            skalViseMotebehov,
            virksomhetsnrListe,
            oppfolgingsforlopsPerioderReducerListe,
            actions,
        } = nextProps;

        finnOgHentManglendeOppfolgingsforlopsPerioder(actions.hentOppfolgingsforlopsPerioder, oppfolgingsforlopsPerioderReducerListe, virksomhetsnrListe);

        if (harForsoektHentetAlt && skalViseMotebehov === false) {
            history.push(`${getContextRoot()}/mote`);
        }
    }

    render() {
        const {
            brodsmuler,
            henter,
            hentingFeilet,
        } = this.props;
        return (
            <Side
                tittel={tekster.sideTittel}
                brodsmuler={brodsmuler}
                laster={henter}>
                {
                    (() => {
                        if (henter) {
                            return <AppSpinner />;
                        } if (hentingFeilet) {
                            return <Feilmelding />;
                        }
                        return (
                            <DialogmoterInnhold
                                {...this.props}
                            />
                        );
                    })()
                }
            </Side>
        );
    }
}

Container.propTypes = {
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    koblingId: PropTypes.string,
    motebehovReducer: motebehovReducerPt,
    harMote: PropTypes.bool,
    harForsoektHentetAlt: PropTypes.bool,
    skalHenteLedere: PropTypes.bool,
    skalViseKvittering: PropTypes.bool,
    skalViseMotebehov: PropTypes.bool,
    virksomhetsnrListe: PropTypes.arrayOf(PropTypes.string),
    virksomhetnrMedMotebehovListe: PropTypes.arrayOf(PropTypes.string),
    oppfolgingsforlopsPerioderReducerListe: PropTypes.arrayOf(PropTypes.shape()),
    actions: PropTypes.shape({
        hentDineSykmeldinger: PropTypes.func,
        hentLedere: PropTypes.func,
        hentMote: PropTypes.func,
        hentMotebehov: PropTypes.func,
        hentOppfolgingsforlopsPerioder: PropTypes.func,
    }),
};

export function mapDispatchToProps(dispatch) {
    const actions = bindActionCreators({
        hentDineSykmeldinger,
        hentLedere,
        hentMote,
        hentMotebehov,
        hentOppfolgingsforlopsPerioder,
    }, dispatch);

    return {
        actions,
    };
}

export function mapStateToProps(state) {
    const ledereReducer = state.ledere;
    const dineSykmeldingerReducer = state.dineSykmeldinger;
    const moteReducer = state.mote;
    const motebehovReducer = state.motebehov;

    const harMote = !!getMote(state);

    const virksomhetsnrListe = finnVirksomheterMedAktivSykmelding(dineSykmeldingerReducer.data, ledereReducer.data);
    const oppfolgingsforlopsPerioderReducerListe = finnOppfolgingsforlopsPerioderForAktiveSykmeldinger(state, virksomhetsnrListe);
    const virksomhetnrMedMotebehovListe = finnVirksomhetnrListeMedSkalViseMotebehov(oppfolgingsforlopsPerioderReducerListe);
    const skalViseMotebehov = skalViseMotebehovMedOppfolgingsforlopListe(oppfolgingsforlopsPerioderReducerListe, motebehovReducer, moteReducer);
    const skalViseKvittering = skalViseMotebehovKvittering(motebehovReducer, virksomhetsnrListe, oppfolgingsforlopsPerioderReducerListe);

    const skalHenteLedere = !henterEllerHarHentetLedere(ledereReducer);

    const hentOppfolgingsforlopsPerioderFeilet = hentOppfolgingsPerioderFeilet(oppfolgingsforlopsPerioderReducerListe);
    const harForsoektHentetAlt = forsoektHentetDineSykmeldinger(dineSykmeldingerReducer)
        && forsoektHentetLedere(ledereReducer)
        && forsoktHentetMote(moteReducer)
        && forsoektHentetOppfolgingsPerioder(oppfolgingsforlopsPerioderReducerListe)
        && (!skalViseMotebehov || motebehovReducer.hentingForsokt);

    return {
        henter: !harForsoektHentetAlt,
        hentingFeilet: state.ledetekster.hentingFeilet
        || ledereReducer.hentingFeilet
        || dineSykmeldingerReducer.hentingFeilet
        || dineSykmeldingerReducer.hentingFeilet
        || hentOppfolgingsforlopsPerioderFeilet
        || motebehovReducer.hentingForbudt
        || (skalViseMotebehov && motebehovReducer.hentingFeilet),
        motebehovReducer,
        oppfolgingsforlopsPerioderReducerListe,
        harMote,
        harForsoektHentetAlt,
        skalHenteLedere,
        skalViseKvittering,
        skalViseMotebehov,
        virksomhetsnrListe,
        virksomhetnrMedMotebehovListe,
        brodsmuler: [{
            tittel: tekster.brodsmuler.dittSykefravaer,
            sti: '/sykefravaer',
            erKlikkbar: true,
        }, {
            tittel: tekster.brodsmuler.dialogmote,
        }],
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
