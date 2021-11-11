import { get } from '@/api/axios';
import { SYFOOPPFOLGINGSPLANSERVICE_API } from '../globals/paths';

export const getSyfoopfolgingsplanservice = () => {
  return get(SYFOOPPFOLGINGSPLANSERVICE_API);
};
