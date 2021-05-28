import { get } from '../../data/gateway-api/gatewayApi';
import { MOTEBEHOV_API } from '../globals/paths';

export const getMotebehov = async () => {
  const url = MOTEBEHOV_API;
  return get(url);
};
