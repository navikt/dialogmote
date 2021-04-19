import React from 'react';
import PropTypes from 'prop-types';
import Sidetopp from '../Sidetopp';
import DialogmoterInnholdLenke from './DialogmoterInnholdLenke';
import DialogmoteVideo from './DialogmoteVideo';
import MotebehovInnholdLenke from './MotebehovInnholdLenke';
import { MOTEBEHOV_SKJEMATYPE, skalViseMotebehovKvittering } from '../../utils/motebehovUtils';
import SvarMotebehovKvittering from './motebehov/svarmotebehov/SvarMotebehovKvittering';
import DialogmoterInnholdVeileder from './DialogmoterInnholdVeileder';
import { motebehovReducerPt } from '../../propTypes';
import MeldMotebehovKvittering from './motebehov/meldbehov/MeldMotebehovKvittering';

const texts = {
  title: 'Dialogmøter',
};

const MotebehovInnholdKvittering = ({ motebehovReducer }) => {
  const isKvittering = skalViseMotebehovKvittering(motebehovReducer);
  const { skjemaType } = motebehovReducer.data;
  let content = React.Fragment;
  if (isKvittering) {
    if (skjemaType === MOTEBEHOV_SKJEMATYPE.MELD_BEHOV) {
      content = <MeldMotebehovKvittering motebehovReducer={motebehovReducer} />;
    } else if (skjemaType === MOTEBEHOV_SKJEMATYPE.SVAR_BEHOV) {
      content = <SvarMotebehovKvittering motebehovReducer={motebehovReducer} />;
    }
  } else {
    content = (
      <React.Fragment>
        <DialogmoterInnholdVeileder />
        <MotebehovInnholdLenke motebehov={motebehovReducer} />
      </React.Fragment>
    );
  }
  return content;
};
MotebehovInnholdKvittering.propTypes = {
  motebehovReducer: motebehovReducerPt,
  skalViseMotebehov: PropTypes.bool,
};

const DialogmoterInnhold = ({ harMote, motebehovReducer, skalViseMotebehov }) => {
  return (
    <div className="dialogmoterInnhold">
      <Sidetopp tittel={texts.title} />

      {skalViseMotebehov && <MotebehovInnholdKvittering motebehovReducer={motebehovReducer} />}

      {harMote && <DialogmoterInnholdLenke />}

      <DialogmoteVideo />
    </div>
  );
};
DialogmoterInnhold.propTypes = {
  harMote: PropTypes.bool,
  motebehovReducer: motebehovReducerPt,
  skalViseMotebehov: PropTypes.bool,
};

export default DialogmoterInnhold;
