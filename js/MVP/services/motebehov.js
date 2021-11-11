import { get } from '@/data/gateway-api';
import { MOTEBEHOV_API } from '../globals/paths';

export const getMotebehov = async () => {
  const url = MOTEBEHOV_API;
  return get(url);
};
