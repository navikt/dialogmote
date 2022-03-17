import { useQuery } from 'react-query';
import { get } from '@/api/axios';
import { MOTEADMIN_API } from '@/MVP/globals/paths';
import { Moteplanlegger } from '@/api/types/moteplanleggerTypes';
import { ApiErrorException } from '@/api/errors';

const MOTEPLANLEGGER = 'moteplanlegger';

export const useMoteplanlegger = () => {
  const fetchPlanlegger = () => get<Moteplanlegger>(`${MOTEADMIN_API}/arbeidstaker/moter/siste`);
  return useQuery<Moteplanlegger, ApiErrorException>(MOTEPLANLEGGER, fetchPlanlegger, {
    retry: 0,
  });
};
