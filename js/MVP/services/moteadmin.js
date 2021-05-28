import { get } from '../../data/gateway-api/gatewayApi';
import { MOTEADMIN_API } from '../globals/paths';

export const getMoteadmin = async () => {
  const url = MOTEADMIN_API;
  return get(url);
};
