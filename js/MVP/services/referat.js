import { get } from '../../data/gateway-api/gatewayApi';
import { ISDIALOGMOTE_API_BASE_PATH } from '../globals/paths';

export const getReferatPdf = async (uuid) => {
  const url = `${ISDIALOGMOTE_API_BASE_PATH}/${uuid}/pdf`;
  return get(url);
};
