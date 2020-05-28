import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    brodsmule as brodsmulePt,
    motebehovReducerPt,
    motebehovSvarReducerPt,
} from '../propTypes';
import Side from './Side';
import MotebehovInnhold from '../components/moter/motebehov/MotebehovInnhold';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import {
    hentMotebehov,
    svarMotebehov,
} from '../data/motebehov/motebehov_actions';
import { erMotebehovTilgjengelig } from '../utils/motebehovUtils';

const tekster = {
    brodsmuler: {
        dittSykefravaer: 'Ditt sykefravær',
        dialogmote: 'Dialogmøte',
    },
    sideTittel: 'Dialogmøtebehov',
};

class Container extends Component {
    componentDidMount() {
        const {
            actions,
        } = this.props;

        actions.hentMotebehov();
    }

    render() {
        const {
            henter,
            hentingFeilet,
            sendingFeilet,
            skalViseMotebehov,
            brodsmuler,
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
                        } if (hentingFeilet || sendingFeilet) {
                            return <Feilmelding />;
                        } if (!skalViseMotebehov) {
                            return (
                                <Feilmelding
                                    tittel="Møtebehovsiden er ikke tilgjengelig nå."
                                    melding="Dette kan være fordi veilederen din allerede har forespurt et møte, hvis ikke, prøv igjen senere."
                                />
                            );
                        }
                        return (
                            <MotebehovInnhold
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
    sendingFeilet: PropTypes.bool,
    skalViseMotebehov: PropTypes.bool,
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    motebehovReducer: motebehovReducerPt,
    motebehovSvarReducer: motebehovSvarReducerPt,
    actions: PropTypes.shape({
        hentMotebehov: PropTypes.func,
        svarMotebehov: PropTypes.func,
    }),
};

export function mapDispatchToProps(dispatch) {
    const actions = bindActionCreators({
        hentMotebehov,
        svarMotebehov,
    }, dispatch);

    return {
        actions,
    };
}

export function mapStateToProps(state) {
    const motebehovReducer = state.motebehov;

    const motebehovSvarReducer = state.motebehovSvar;
    const skalViseMotebehov = erMotebehovTilgjengelig(motebehovReducer);

    const harForsoektHentetAlt = motebehovReducer.hentingForsokt;
    return {
        henter: !harForsoektHentetAlt,
        hentingFeilet: motebehovReducer.hentingFeilet,
        sendingFeilet: motebehovSvarReducer.sendingFeilet,
        skalViseMotebehov,
        motebehovReducer,
        motebehovSvarReducer,
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
