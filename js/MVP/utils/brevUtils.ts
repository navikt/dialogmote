import { Brev } from '@/api/types/brevTypes';
import { Moteplanlegger } from '@/api/types/moteplanleggerTypes';
import { brevTypes } from '@/MVP/globals/constants';
import { AVBRUTT, erMotePassert } from '@/utils/moteUtils';

const harSammeAvlysningsstatus = (brevType: string, moteplanleggerStatus: string): boolean => {
  return (
    (brevType === brevTypes.AVLYST && moteplanleggerStatus === AVBRUTT) ||
    (brevType !== brevTypes.AVLYST && moteplanleggerStatus !== AVBRUTT)
  );
};

export const shouldDisplayBrev = (brevData: Brev[], moteplanleggerData: Moteplanlegger): boolean => {
  if (brevData?.length === 0) {
    return false;
  }
  if (moteplanleggerData) {
    const brevArraySorted = brevData.sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf());
    const sistOpprettetBrev = brevArraySorted[0];

    const sistOpprettetBrevTidspunkt = new Date(sistOpprettetBrev.createdAt);
    const sistOpprettetMoteplanleggerMoteTidspunkt = new Date(moteplanleggerData.opprettetTidspunkt);

    if (
      harSammeAvlysningsstatus(sistOpprettetBrev.brevType, moteplanleggerData.status) ||
      sistOpprettetBrev.brevType === brevTypes.REFERAT
    ) {
      return sistOpprettetBrevTidspunkt > sistOpprettetMoteplanleggerMoteTidspunkt; // Viser enten siste avvlysning/avbryttelse eller sist opprettet møte i planlegger eller innkalling
    }
    if (
      sistOpprettetBrev.brevType === brevTypes.AVLYST &&
      moteplanleggerData.status !== AVBRUTT &&
      !erMotePassert(moteplanleggerData) // Viser enten avvlysning i innkalling eller sist opprettet møte i planlegger hvis dato er Ok.
    ) {
      return false;
    }
  }
  return true;
};
