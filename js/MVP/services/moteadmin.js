import { get } from '@/data/gateway-api';
import { MOTEADMIN_API } from '../globals/paths';

export const getMoteadmin = async () => {
  return get(MOTEADMIN_API);
};
