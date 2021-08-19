import React from 'react';
import AppSpinner from '../../../components/AppSpinner';
import Feilmelding from '../../../components/Feilmelding';
import AvbruttMote from '../../../components/moter/moteplanlegger/AvbruttMote';
import MotePassert from '../../../components/moter/moteplanlegger/MotePassert';
import { BRUKER } from '../../../enums/moteplanleggerDeltakerTyper';
import {
  AVBRUTT,
  BEKREFTET,
  erMotePassert,
  getSvarsideModus,
  konverterTid,
  MOTESTATUS,
} from '../../../utils/moteUtils';
import DialogmoteContainer from '../../containers/DialogmoteContainer';
import { brevTypes } from '../../globals/constants';
import { innkallelseBreadcrumb } from '../../globals/paths';
import { useMoteplanlegger } from '../../hooks/moteplanlegger';

const isSkjemaStatus = function (modus) {
  // TODO: Can we jus check for SKJEMA?
  return modus !== AVBRUTT && modus !== BEKREFTET && modus !== MOTESTATUS;
};

const Moteplanlegger = () => {
  const { data: moteplanlegger, status } = useMoteplanlegger();

  if (status !== 'success') {
    return <AppSpinner />;
  }

  const mote = konverterTid(moteplanlegger);
  const modus = getSvarsideModus(mote, BRUKER);

  if (erMotePassert(mote)) {
    return <MotePassert />;
  }

  return (
    <DialogmoteContainer breadcrumb={innkallelseBreadcrumb('Tidspunkt for dialogmøte')}>
      {modus === AVBRUTT && <AvbruttMote mote={mote} />}
      {/* todo: implement or reuse Svarside/Svarskjema */}
      {/* todo: implement case for feilvisning */}
      {isSkjemaStatus(modus) && mote && <Feilmelding />}
    </DialogmoteContainer>
  );
};

Moteplanlegger.propTypes = {};

export default Moteplanlegger;
