import React, { ReactElement } from 'react';
import IkkeSykmeldtLanding from '@/MVP/views/landing/components/IkkeSykmeldtLanding';
import { Brev } from '@/api/types/brevTypes';
import { PreviousMotereferatFeaturePanel } from '@/MVP/views/landing/components/PreviousMotereferatFeaturePanel';

interface Props {
  displayBrev: boolean;
  brevData: Brev[];
}

export const NoSykmeldingerPanel = ({ displayBrev, brevData }: Props): ReactElement => {
  return (
    <React.Fragment>
      <IkkeSykmeldtLanding />
      <PreviousMotereferatFeaturePanel displayBrev={displayBrev} brevData={brevData} displayAlleReferater={true} />
    </React.Fragment>
  );
};
