import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema/src/feiloppsummering';
import { MOTEBEHOV_API } from '@/MVP/globals/paths';
import { get } from '@/api/axios';
import { MotebehovStatus } from '@/api/types/motebehovTypes';

const MOTEBEHOV = 'motebehov';

export const useMotebehov = () => {
  const fetchMotebehov = () => get<MotebehovStatus>(MOTEBEHOV_API);
  return useQuery(MOTEBEHOV, fetchMotebehov);
};

export const useFeiloppsumeringList = (errors) => {
  const [errorList, setErrorList] = useState<FeiloppsummeringFeil[]>([]);

  useEffect(() => {
    const keys = Object.keys(errors);
    const list = keys.map((key) => {
      return { skjemaelementId: key, feilmelding: errors[key].message };
    });
    setErrorList(list);
  }, [errors]);

  return errorList;
};
