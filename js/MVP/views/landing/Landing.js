import React from 'react';
import AppSpinner from '../../../components/AppSpinner';
import { BRUKER } from '../../../enums/moteplanleggerDeltakerTyper';
import { AVBRUTT, BEKREFTET, getSvarsideModus, konverterTid, MOTESTATUS } from '../../../utils/moteUtils';
import DialogmoteContainer from '../../containers/DialogmoteContainer';
import { brevTypes } from '../../globals/constants';
import { useBrev } from '../../hooks/brev';
import { useMotebehov } from '../../hooks/motebehov';
import { useMoteplanlegger } from '../../hooks/moteplanlegger';
import { getLongDateFormat } from '../../utils';
import DialogmoteVideoPanel from './components/DialogmoteVideoPanel';
import MotebehovPanel from './components/MotebehovPanel';
import MoteinnkallelsePanel from './components/MoteinnkallelsePanel';
import MoteplanleggerKvitteringPanel from './components/MoteplanleggerKvitteringPanel';
import MoteplanleggerPanel from './components/MoteplanleggerPanel';
import MotereferatPanel from './components/MotereferatPanel';
import PreviousMotereferatPanel from './components/PreviousMotereferatPanel';
import VeilederLanding from './components/VeilederLanding';

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

    const innkallelser = brev.data.filter((hendelse) => hendelse.brevType === brevTypes.INNKALLELSE);

    if (innkallelser.length < 1) {
      return false;
    }

    if (!moteplanlegger.isError && moteplanlegger.data && innkallelser.length > 0) {
      if (moteplanlegger.data.status !== AVBRUTT) {
        const innkalelseDatoArraySorted = innkallelser.map((i) => new Date(i.createdAt)).sort((a, b) => b - a);
        const sistOpprettetInnkallelse = innkalelseDatoArraySorted[0];
        const sistOpprettetMoteplanleggerMoteTidspunkt = new Date(moteplanlegger.data.opprettetTidspunkt);

        return sistOpprettetInnkallelse > sistOpprettetMoteplanleggerMoteTidspunkt;
      }
      if (moteplanlegger.data.status === AVBRUTT) {
        return true;
      }
    }
    return true;
  };

  const DialogmoteFeaturePanel = () => {
    if (isInnkallelseFlyt()) {
      if (brevHead.brevType === brevTypes.REFERAT) {
        const date = getLongDateFormat(brevHead.tid);
        return <MotereferatPanel date={date} />;
      }
      return <MoteinnkallelsePanel innkallelse={brevHead} />;
    }

    if (moteplanlegger && moteplanlegger.data) {
      const modus = getSvarsideModus(moteplanlegger.data, BRUKER);
      const convertedMotedata = konverterTid(moteplanlegger.data);
      if (modus === BEKREFTET || modus === MOTESTATUS) {
        return <MoteplanleggerKvitteringPanel mote={convertedMotedata} modus={modus} />;
      }
      return <MoteplanleggerPanel mote={convertedMotedata} />;
    }
    return null;
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
