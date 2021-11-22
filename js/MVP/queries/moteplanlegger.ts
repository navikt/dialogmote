import { ApiErrorException } from '@/api/errors';
import { useQuery } from 'react-query';
import { getMoteadmin } from '../services/moteadmin';
import { Moteplanlegger } from '@/api/types/moteplanleggerTypes';

const MOTEPLANLEGGER = 'moteplanlegger';

export const useMoteplanlegger = () => {
  return useQuery<Moteplanlegger, ApiErrorException>(MOTEPLANLEGGER, getMoteadmin, {
    retry: 0,
  });
};
