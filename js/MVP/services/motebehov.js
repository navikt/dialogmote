import { get } from '@/api/axios';
import { MOTEBEHOV_API } from '../globals/paths';

export const getMotebehov = async () => {
  return get(MOTEBEHOV_API);
};
