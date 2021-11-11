import { get } from '@/api/axios';
import { MOTEADMIN_API } from '../globals/paths';

export const getMoteadmin = () => {
  return get(MOTEADMIN_API);
};
