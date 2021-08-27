import React from 'react';
import { BRUKER } from '../../../enums/moteplanleggerDeltakerTyper';
import { AVBRUTT, BEKREFTET, getSvarsideModus, konverterTid, MOTESTATUS } from '../../../utils/moteUtils';
import DialogmoteContainer from '../../containers/DialogmoteContainer';
import MoteplanleggerPanel from './components/MoteplanleggerPanel';
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
import MoteplanleggerKvitteringPanel from './components/MoteplanleggerKvitteringPanel';

const Landing = () => {
  const brev = useBrev();
  const motebehov = useMotebehov();
  const moteplanlegger = useMoteplanlegger();

  if (brev.isLoading || motebehov.isLoading || moteplanlegger.isLoading) {
    return <AppSpinner />;
  }

  const brevHead = brev.data[0];
  const brevTail = brev.data.slice(1);

  const isInnkallelseFlyt = () => {
    if (!brevHead) {
      return false;
    }

    const motedata = moteplanlegger.data;
    const innkallelser = brevTail.filter((hendelse) => hendelse.brevType === brevTypes.INNKALLELSE);

    if (motedata.status === AVBRUTT && innkallelser.length > 0) {
      return true;
    }

    if (motedata.status !== AVBRUTT && innkallelser.length > 0) {
      const innkalelseDatoArraySorted = innkallelser.map((i) => new Date(i.createdAt)).sort((a, b) => b - a);
      const sistOpprettetInnkallelse = innkalelseDatoArraySorted[0];
      const sistOpprettetMoteplanleggerMoteTidspunkt = new Date(motedata.opprettetTidspunkt);

      return sistOpprettetInnkallelse > sistOpprettetMoteplanleggerMoteTidspunkt;
    }
    return false;
  };

  const DialogmoteFeaturePanel = () => {
    if (isInnkallelseFlyt()) {
      if (brevHead.brevType === brevTypes.REFERAT) {
        const date = getLongMonthDateFormat(brevHead.tid);
        return <MotereferatPanel date={date} />;
      }
      return <MoteinnkallelsePanel innkallelse={brevHead} />;
    }

    const modus = getSvarsideModus(moteplanlegger.data, BRUKER);
    const convertedMotedata = konverterTid(moteplanlegger.data);

    if (modus === BEKREFTET || modus === MOTESTATUS) {
      return <MoteplanleggerKvitteringPanel mote={convertedMotedata} modus={modus} />;
    }
    return <MoteplanleggerPanel mote={convertedMotedata} />;
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
