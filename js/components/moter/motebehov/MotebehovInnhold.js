import React from 'react';
import PropTypes from 'prop-types';
import { motebehovReducerPt, motebehovSvarReducerPt } from '../../../propTypes';
import { MOTEBEHOV_SKJEMATYPE } from '../../../utils/motebehovUtils';
import MeldMotebehovInnhold from './meldbehov/MeldMotebehovInnhold';
import SvarMotebehovInnhold from './svarmotebehov/SvarMotebehovInnhold';

const MotebehovInnhold = ({ actions, motebehovReducer, motebehovSvarReducer }) => {
  const { skjemaType } = motebehovReducer.data;
  let content = React.Fragment;
  if (skjemaType === MOTEBEHOV_SKJEMATYPE.MELD_BEHOV) {
    content = (
      <MeldMotebehovInnhold
        svarMotebehov={actions.svarMotebehov}
        motebehovReducer={motebehovReducer}
        motebehovSvarReducer={motebehovSvarReducer}
      />
    );
  } else if (skjemaType === MOTEBEHOV_SKJEMATYPE.SVAR_BEHOV) {
    content = (
      <SvarMotebehovInnhold
        svarMotebehov={actions.svarMotebehov}
        motebehovReducer={motebehovReducer}
        motebehovSvarReducer={motebehovSvarReducer}
      />
    );
  }
  return <div className="motebehovSideInnhold">{content}</div>;
};
MotebehovInnhold.propTypes = {
  actions: PropTypes.shape({
    hentMotebehov: PropTypes.func,
    svarMotebehov: PropTypes.func,
  }),
  motebehovReducer: motebehovReducerPt,
  motebehovSvarReducer: motebehovSvarReducerPt,
};

export default MotebehovInnhold;
