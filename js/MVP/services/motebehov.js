import { MOTEBEHOV_API } from '../globals/paths';
import { get } from '@/api/axios';

export const getMotebehov = () => {
  return get(MOTEBEHOV_API);
};
