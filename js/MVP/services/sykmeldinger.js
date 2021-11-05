import { get } from '../../data/gateway-api';
import { SYFOOPPFOLGINGSPLANSERVICE_API } from '../globals/paths';

export const getSyfoopfolgingsplanservice = async () => {
  const url = SYFOOPPFOLGINGSPLANSERVICE_API;
  return get(url);
};
