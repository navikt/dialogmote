import { get } from '@/api/axios';
import { MOTEADMIN_API } from '../globals/paths';
import { Moteplanlegger } from '@/api/types/moteplanleggerTypes';

export const getMoteadmin: () => Promise<Moteplanlegger> = async () => {
  return get(MOTEADMIN_API);
};
