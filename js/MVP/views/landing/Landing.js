import React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import styled from 'styled-components';
import AppSpinner from '../../../components/AppSpinner';
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

const AlertStripeStyled = styled(AlertStripe)`
  margin-bottom: 32px;
`;

const Landing = () => {
  const brev = useBrev();
  const motebehov = useMotebehov();
  const moteplanlegger = useMoteplanlegger();

  if (brev.isLoading || motebehov.isLoading || moteplanlegger.isLoading) {
    return <AppSpinner />;
  }

  const FetchFailedError = () => {
    if (brev.isError || motebehov.isError || (moteplanlegger.isError && !(moteplanlegger.error.message === '404'))) {
      return (
        <AlertStripeStyled type="feil">
          Akkurat nå mangler det noe her. Vi har tekniske problemer som vi jobber med å løse. Prøv gjerne igjen om en
          stund.
        </AlertStripeStyled>
      );
    }

    return null;
  };

  const displayBrev = () => {
    if (brev.isError || brev.data.length === 0) {
      return false;
    }

    if (!moteplanlegger.isError && moteplanlegger.data) {
      if (moteplanlegger.data.status !== AVBRUTT) {
        const brevDatoArraySorted = brev.data.map((i) => new Date(i.createdAt)).sort((a, b) => b - a);
        const sistOpprettetBrev = brevDatoArraySorted[0];
        const sistOpprettetMoteplanleggerMoteTidspunkt = new Date(moteplanlegger.data.opprettetTidspunkt);

        return sistOpprettetBrev > sistOpprettetMoteplanleggerMoteTidspunkt;
      }
    }
    return true;
  };

  const displayMotebehov = () => {
    if (motebehov.isError || !motebehov.data.visMotebehov) return false;
    if (!moteplanlegger.isError && moteplanlegger.data.status !== AVBRUTT && !erMotePassert(moteplanlegger.data))
      return false;
    if (!brev.isError && brev.data[0]) {
      const brevHead = brev.data[0];
      if (brevHead.brevType === brevTypes.INNKALT || brevHead.brevType === brevTypes.ENDRING) return false;
    }

    return true;
  };

  const BrevPanel = () => {
    const brevHead = brev.data[0];

    if (brevHead.brevType === brevTypes.REFERAT) {
      const date = getLongDateFormat(brevHead.tid);
      return <MotereferatPanel date={date} />;
    }
    return <MoteinnkallelsePanel innkallelse={brevHead} />;
  };

  const PlanleggerPanel = () => {
    const modus = getSvarsideModus(moteplanlegger.data, BRUKER);
    const convertedMotedata = konverterTid(moteplanlegger.data);
    if (modus === BEKREFTET || modus === MOTESTATUS) {
      return <MoteplanleggerKvitteringPanel mote={convertedMotedata} modus={modus} />;
    }
    return <MoteplanleggerPanel modus={modus} />;
  };

  const DialogmoteFeaturePanel = () => {
    if (displayBrev()) {
      return BrevPanel();
    }
    if (!moteplanlegger.isError && !erMotePassert(moteplanlegger.data)) {
      return PlanleggerPanel();
    }
    return null;
  };

  const PreviousMotereferatFeaturePanel = () => {
    if (brev.isError || brev.data.length < 2) return null;

    const currentBrev = displayBrev() ? brev.data.slice(1) : brev.data;
    const previousReferater = currentBrev.filter((hendelse) => hendelse.brevType === brevTypes.REFERAT);
    const previousReferatDates = previousReferater.map(({ tid }) => tid);

    return <PreviousMotereferatPanel previousReferatDates={previousReferatDates} />;
  };

  return (
    <DialogmoteContainer title="Dialogmøter">
      <VeilederLanding />

      <FetchFailedError />

      {displayMotebehov() && <MotebehovPanel motebehov={motebehov} />}

      <DialogmoteFeaturePanel />
      <PreviousMotereferatFeaturePanel />
      <DialogmoteVideoPanel />
    </DialogmoteContainer>
  );
};

Landing.propTypes = {};

export default Landing;
