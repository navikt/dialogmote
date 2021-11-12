import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import AvbruttMote from '../components/moter/moteplanlegger/AvbruttMote';
import BekreftetKvittering from '../components/moter/moteplanlegger/BekreftetKvittering';
import Kvittering from '../components/moter/moteplanlegger/Kvittering';
import MotePassert from '../components/moter/moteplanlegger/MotePassert';
import Svarside from '../components/moter/moteplanlegger/Svarside';
import { hentMotebehov } from '@/data/motebehov/motebehov_actions';
import { hentMote } from '@/data/moter/mote_actions';
import { sendSvar } from '@/data/svar/svar_actions';
import { brodsmule as brodsmulePt, motebehovReducerPt, moteplanleggerDeltakerPt, motePt } from '../propTypes';
import { AVBRUTT, BEKREFTET, erMotePassert, getSvarsideModus, MOTESTATUS, SKJEMA } from '@/utils/moteUtils';
import Side from './Side';

const tekster = {
  brodsmuleBase: 'Ditt sykefravær',
  titler: {
    tidspunkt: 'Tidspunkt for dialogmøte',
    svart: 'Svaret ditt på tidspunkt for dialogmøte',
    bekreftet: 'Møtebekreftelse',
  },
};

const hentTittelTekstFraModus = (modus) => {
  const { titler } = tekster;
  switch (modus) {
    case SKJEMA:
    case AVBRUTT:
      return titler.tidspunkt;
    case MOTESTATUS:
      return titler.svart;
    case BEKREFTET:
      return titler.bekreftet;
    default:
      return titler.tidspunkt;
  }
};

export class Container extends Component {
  UNSAFE_componentWillMount() {
    const { doHentMote } = this.props;
    doHentMote();
  }

  componentDidMount() {
    const { doHentMotebehov } = this.props;
    doHentMotebehov();
  }

  render() {
    const { henter, mote, brodsmuler, hentingFeilet, moteIkkeFunnet, doSendSvar } = this.props;
    const modus = getSvarsideModus(mote);
    const tittel = hentTittelTekstFraModus(modus);

    return (
      <Side tittel={tittel} brodsmuler={[...brodsmuler, { tittel }]}>
        {(() => {
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
            return <BekreftetKvittering mote={mote} />;
          }
          if (modus === MOTESTATUS) {
            return <Kvittering mote={mote} />;
          }
          if (modus === AVBRUTT) {
            return <AvbruttMote mote={mote} />;
          }
          if (mote) {
            return <Svarside {...this.props} sendSvar={doSendSvar} />;
          }
          return <Feilmelding />;
        })()}
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
};

export function mapStateToProps(state) {
  const motebehovReducer = state.motebehov;
  return {
    mote: state.mote.data,
    moteIkkeFunnet: state.mote.moteIkkeFunnet === true,
    motebehovReducer,
    henter: state.mote.henter,
    hentet: state.mote.hentet === true,
    hentingFeilet: state.mote.hentingFeilet,
    sender: state.svar.sender,
    sendingFeilet: state.svar.sendingFeilet,
    brodsmuler: [
      {
        tittel: tekster.brodsmuleBase,
        sti: '/sykefravaer',
        erKlikkbar: true,
      },
      {
        tittel: 'Dialogmøter',
        sti: '/',
        erKlikkbar: true,
      },
    ],
  };
}

const actionCreators = {
  doHentMote: hentMote,
  doHentMotebehov: hentMotebehov,
  doSendSvar: sendSvar,
};

export default connect(mapStateToProps, actionCreators)(Container);
