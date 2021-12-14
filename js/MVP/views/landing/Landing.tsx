import VeilederSpeechBubble from '@/MVP/components/VeilederSpeechBubble';
import VeilederLandingContent from '@/MVP/views/landing/components/VeilederLandingContent';
import React, { ReactElement } from 'react';
import AppSpinner from '../../../components/AppSpinner';
import { AVBRUTT, erMotePassert } from '@/utils/moteUtils';
import DialogmoteContainer from '../../containers/DialogmoteContainer';
import { brevTypes } from '../../globals/constants';
import { useBrev } from '../../queries/brev';
import { useMotebehov } from '../../queries/motebehov';
import { useMoteplanlegger } from '../../queries/moteplanlegger';
import { useSykmeldinger } from '../../queries/sykmeldinger';
import DialogmoteVideoPanel from './components/DialogmoteVideoPanel';
import MotebehovPanel from './components/MotebehovPanel';
import FeilAlertStripe from '@/MVP/components/FeilAlertStripe';
import { MotebehovStatus } from '@/api/types/motebehovTypes';
import { Moteplanlegger } from '@/api/types/moteplanleggerTypes';
import { Brev } from '@/api/types/brevTypes';
import { PreviousMotereferatFeaturePanel } from '@/MVP/views/landing/components/PreviousMotereferatFeaturePanel';
import { NoSykmeldingerPanel } from '@/MVP/views/landing/components/NoSykmeldingerPanel';
import { shouldDisplayBrev } from '@/MVP/utils/brevUtils';
import { BrevPanel } from '@/MVP/views/landing/components/BrevPanel';
import { PlanleggerPanel } from '@/MVP/views/landing/components/PlanleggerPanel';

const Landing = (): ReactElement => {
  const brev = useBrev();
  const motebehov = useMotebehov();
  const moteplanlegger = useMoteplanlegger();
  const sykmeldinger = useSykmeldinger();

  if (brev.isLoading || motebehov.isLoading || moteplanlegger.isLoading || sykmeldinger.isLoading) {
    return <AppSpinner />;
  }

  const FetchFailedError = (): ReactElement | null => {
    if (
      brev.isError ||
      motebehov.isError ||
      (moteplanlegger.isError && !(moteplanlegger.error.code === 404)) ||
      sykmeldinger.isError
    ) {
      return <FeilAlertStripe />;
    }

    return null;
  };

  const shouldDisplayMotebehov = (
    motebehovData: MotebehovStatus,
    moteplanleggerData: Moteplanlegger,
    brevData: Brev[]
  ): boolean => {
    const harAlleredeMoteplanleggerPaaGang =
      moteplanleggerData.status !== AVBRUTT && !erMotePassert(moteplanleggerData);
    const isBrevTypeInnkaltEllerEndring =
      brevData[0]?.brevType === brevTypes.INNKALT || brevData[0]?.brevType === brevTypes.ENDRING;

    return motebehovData.visMotebehov && !harAlleredeMoteplanleggerPaaGang && !isBrevTypeInnkaltEllerEndring;
  };

  const MainContentPanel = (): ReactElement | null => {
    if (brev.isSuccess && moteplanlegger.isSuccess && motebehov.isSuccess && sykmeldinger.isSuccess) {
      const displayBrev = shouldDisplayBrev(brev.data, moteplanlegger.data);
      const displayMotebehov = shouldDisplayMotebehov(motebehov.data, moteplanlegger.data, brev.data);
      const isMotePassert = erMotePassert(moteplanlegger.data);

      if (sykmeldinger.data.length === 0) {
        return <NoSykmeldingerPanel displayBrev={displayBrev} brevData={brev.data} />;
      }
      return (
        <React.Fragment>
          <MotebehovPanel displayPanel={displayMotebehov} motebehov={motebehov} />
          <BrevPanel displayPanel={displayBrev} brevData={brev.data} />
          <PlanleggerPanel displayPanel={!isMotePassert && !displayBrev} moteplanleggerData={moteplanlegger.data} />
          <PreviousMotereferatFeaturePanel
            displayBrev={displayBrev}
            brevData={brev.data}
            displayAlleReferater={false}
          />
        </React.Fragment>
      );
    }
    return null;
  };

  return (
    <DialogmoteContainer title="Dialogmøter">
      <VeilederSpeechBubble content={<VeilederLandingContent />} />

      <FetchFailedError />

      <MainContentPanel />

      <DialogmoteVideoPanel />
    </DialogmoteContainer>
  );
};

Landing.propTypes = {};

export default Landing;
