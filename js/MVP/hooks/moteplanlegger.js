import { useQuery } from 'react-query';
import { getMoteadmin } from '../services/moteadmin';

const MOTEPLANLEGGER = 'moteplanlegger';

export const useMoteplanlegger = () => {
  return useQuery(MOTEPLANLEGGER, getMoteadmin);
};
