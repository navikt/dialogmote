import React, { ReactElement } from 'react';
import { BEKREFTET, getSvarsideModus, konverterTid, MOTESTATUS } from '@/utils/moteUtils';
import { BRUKER } from '@/enums/moteplanleggerDeltakerTyper';
import MoteplanleggerKvitteringPanel from '@/MVP/views/landing/components/MoteplanleggerKvitteringPanel';
import MoteplanleggerPanel from '@/MVP/views/landing/components/MoteplanleggerPanel';
import { Moteplanlegger } from '@/api/types/moteplanleggerTypes';

interface Props {
  displayPanel: boolean;
  moteplanleggerData?: Moteplanlegger;
}

export const PlanleggerPanel = ({ displayPanel, moteplanleggerData }: Props): ReactElement | null => {
  if (!displayPanel) return null;

  const modus = getSvarsideModus(moteplanleggerData, BRUKER);
  const convertedMotedata = konverterTid(moteplanleggerData);
  if (modus === BEKREFTET || modus === MOTESTATUS) {
    return <MoteplanleggerKvitteringPanel mote={convertedMotedata} modus={modus} />;
  }
  return <MoteplanleggerPanel modus={modus} />;
};
