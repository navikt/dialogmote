import { Brev } from '@/api/types/brevTypes';
import React, { ReactElement } from 'react';
import { brevTypes } from '@/MVP/globals/constants';
import MotereferatPanel from '@/MVP/views/landing/components/MotereferatPanel';
import MoteinnkallelsePanel from '@/MVP/views/landing/components/MoteinnkallelsePanel';
import { getLongDateFormat } from '@/MVP/utils';

interface Props {
  displayPanel: boolean;
  brevData: Brev[];
}

export const BrevPanel = ({ displayPanel, brevData }: Props): ReactElement | null => {
  if (!displayPanel) return null;
  const brevHead = brevData ? brevData[0] : undefined;

  if (brevHead?.brevType === brevTypes.REFERAT) {
    const date = getLongDateFormat(brevHead.tid);
    return <MotereferatPanel date={date} />;
  }
  return <MoteinnkallelsePanel innkallelse={brevHead} />;
};
