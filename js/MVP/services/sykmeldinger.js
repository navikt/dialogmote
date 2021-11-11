import { get } from '@/data/gateway-api';
import { SYFOOPPFOLGINGSPLANSERVICE_API } from '../globals/paths';

export const getSyfoopfolgingsplanservice = async () => {
  return get(SYFOOPPFOLGINGSPLANSERVICE_API);
};
