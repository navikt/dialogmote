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
import { brodsmule as brodsmulePt, motebehovReducerPt } from '../propTypes';
import { hentMote } from '@/data/moter/mote_actions';
import { hentMotebehov } from '@/data/motebehov/motebehov_actions';
import { forsoktHentetMote } from '@/utils/reducerUtils';
import { getMote } from '@/utils/moteUtils';
import { erMotebehovTilgjengelig } from '@/utils/motebehovUtils';

const tekster = {
  brodsmuler: {
    dittSykefravaer: 'Ditt sykefravær',
    dialogmote: 'Dialogmøter',
  },
  sideTittel: 'Dialogmøter',
};

class Container extends Component {
  componentDidMount() {
    const { actions, skalViseMotebehov, harForsoektHentetAlt } = this.props;

    actions.hentMote();
    actions.hentMotebehov();
    if (harForsoektHentetAlt && skalViseMotebehov === false) {
      history.push(`${getContextRoot()}/mote`);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { harForsoektHentetAlt, skalViseMotebehov } = nextProps;
    if (harForsoektHentetAlt && skalViseMotebehov === false) {
      history.push(`${getContextRoot()}/mote`);
    }
  }

  render() {
    const { brodsmuler, henter, hentingFeilet } = this.props;
    return (
      <Side tittel={tekster.sideTittel} brodsmuler={brodsmuler} laster={henter}>
        {(() => {
          if (henter) {
            return <AppSpinner />;
          }
          if (hentingFeilet) {
            return <Feilmelding />;
          }
          return <DialogmoterInnhold {...this.props} />;
        })()}
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
  skalViseMotebehov: PropTypes.bool,
  actions: PropTypes.shape({
    hentMote: PropTypes.func,
    hentMotebehov: PropTypes.func,
  }),
};

export function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators(
    {
      hentMote,
      hentMotebehov,
    },
    dispatch
  );

  return {
    actions,
  };
}

export function mapStateToProps(state) {
  const moteReducer = state.mote;
  const motebehovReducer = state.motebehov;

  const harMote = !!getMote(state);

  const skalViseMotebehov = erMotebehovTilgjengelig(motebehovReducer);

  const harForsoektHentetAlt =
    forsoktHentetMote(moteReducer) && (!skalViseMotebehov || motebehovReducer.hentingForsokt);

  return {
    henter: !harForsoektHentetAlt,
    hentingFeilet: motebehovReducer.hentingForbudt || (skalViseMotebehov && motebehovReducer.hentingFeilet),
    motebehovReducer,
    harMote,
    harForsoektHentetAlt,
    skalViseMotebehov,
    brodsmuler: [
      {
        tittel: tekster.brodsmuler.dittSykefravaer,
        sti: '/sykefravaer',
        erKlikkbar: true,
      },
      {
        tittel: tekster.brodsmuler.dialogmote,
      },
    ],
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
