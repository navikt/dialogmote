import { get } from '@/api/axios';
import { SYFOOPPFOLGINGSPLANSERVICE_API } from '../globals/paths';

export const getSyfoopfolgingsplanservice = async () => {
  return get(SYFOOPPFOLGINGSPLANSERVICE_API);
};
