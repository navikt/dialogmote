import React, { ReactElement } from 'react';
import { brevTypes } from '@/MVP/globals/constants';
import PreviousMotereferatPanel from '@/MVP/views/landing/components/PreviousMotereferatPanel';
import { Brev } from '@/api/types/brevTypes';

interface PreviousMotereferatFeaturePanelProps {
  displayBrev: boolean;
  brevData: Brev[];
  displayAlleReferater: boolean;
}

export const PreviousMotereferatFeaturePanel = ({
  displayBrev,
  brevData,
  displayAlleReferater,
}: PreviousMotereferatFeaturePanelProps): ReactElement | null => {
  if (!displayAlleReferater && brevData.length < 2) return null;

  const currentBrev = displayBrev && !displayAlleReferater ? brevData.slice(1) : brevData;
  const previousReferater = currentBrev.filter((hendelse) => hendelse.brevType === brevTypes.REFERAT);
  const previousReferatDates = previousReferater.map(({ tid }) => tid);

  return <PreviousMotereferatPanel previousReferatDates={previousReferatDates} />;
};
