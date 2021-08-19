import React from 'react';
import { konverterTid } from '../../../utils/moteUtils';
import DialogmoteContainer from '../../containers/DialogmoteContainer';
import VeilederLanding from './components/VeilederLanding';
import MotebehovPanel from './components/MotebehovPanel';
import MoteinnkallelsePanel from './components/MoteinnkallelsePanel';
import DialogmoteVideoPanel from './components/DialogmoteVideoPanel';
import MotereferatPanel from './components/MotereferatPanel';
import PreviousMotereferatPanel from './components/PreviousMotereferatPanel';
import { useBrev } from '../../hooks/brev';
import { useMotebehov } from '../../hooks/motebehov';
import { useMoteplanlegger } from '../../hooks/moteplanlegger';
import AppSpinner from '../../../components/AppSpinner';
import { brevTypes } from '../../globals/constants';
import { getLongMonthDateFormat } from '../../utils';
import MoteplanleggerPanel from './components/MoteplanleggerPanel';

const Landing = () => {
  const brev = useBrev();
  const motebehov = useMotebehov();
  const moteplanlegger = useMoteplanlegger();

  if (brev.isLoading || motebehov.isLoading || moteplanlegger.isLoading) {
    return <AppSpinner />;
  }

  const brevHead = brev.data[0];
  const brevTail = brev.data.slice(1);

  const DialogmoteFeaturePanel = () => {
    if (!brevHead) return null;

    // TODO : logikk for visning MoteinnkallelsePanel vs MoteplanleggerPanel
    return <MoteplanleggerPanel mote={konverterTid(moteplanlegger.data)} />;

    if (brevHead.brevType === brevTypes.REFERAT) {
      const date = getLongMonthDateFormat(brevHead.tid);
      return <MotereferatPanel date={date} />;
    }

    return <MoteinnkallelsePanel innkallelse={brevHead} />;
  };

  const previousReferater = brevTail.filter((hendelse) => hendelse.brevType === brevTypes.REFERAT);

  const previousReferatDates = previousReferater.map(({ tid }) => tid);

  return (
    <DialogmoteContainer title="Dialogmøter">
      <VeilederLanding />

      {motebehov.data.visMotebehov && <MotebehovPanel motebehov={motebehov} />}

      <DialogmoteFeaturePanel />

      <PreviousMotereferatPanel previousReferatDates={previousReferatDates} />

      <DialogmoteVideoPanel />
    </DialogmoteContainer>
  );
};

Landing.propTypes = {};

export default Landing;
