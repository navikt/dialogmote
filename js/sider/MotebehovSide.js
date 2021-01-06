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
import {
    erMotebehovTilgjengelig,
    skalViseMotebehovKvittering,
} from '../utils/motebehovUtils';

const tekster = {
    brodsmuleBase: 'Ditt sykefravær',
    tittler: {
        meldBehov: 'Meld behov for møte',
        kvittering: 'Kvittering for møtebehov'
    }
};

class Container extends Component {
    constructor(props) {
        super(props);
        this.state = { currentTitle: tekster.tittler.meldBehov }
    }

    componentDidMount() {
        const {
            actions,
        } = this.props;

        actions.hentMotebehov();
    }

    componentDidUpdate() {
        const { motebehovReducer } = this.props;
        const kvitteringsside = skalViseMotebehovKvittering(motebehovReducer);
        if (kvitteringsside) {
            this.setTitle(tekster.tittler.kvittering);
        }
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
                tittel={this.state.currentTitle}
                brodsmuler={[ ...brodsmuler, { tittel: this.state.currentTitle } ]}
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

    setTitle(title) {
        if (this.state.currentTitle !== title) {
            this.setState({ currentTitle: title });
        }
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
            tittel: tekster.brodsmuleBase,
            sti: '/sykefravaer',
            erKlikkbar: true,
        }],
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
