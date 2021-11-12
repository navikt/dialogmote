import { get, getRaw, post } from '../../data/gateway-api/gatewayApi';
import { ISDIALOGMOTE_API_BASE_PATH } from '../globals/paths';

export const postLestBrev = async (uuid) => {
  const url = `${ISDIALOGMOTE_API_BASE_PATH}/${uuid}/les`;
  return post(url);
};

export const getBrev = async () => {
  return get(ISDIALOGMOTE_API_BASE_PATH);
};

export const getBrevPdf = async (uuid) => {
  const url = `${ISDIALOGMOTE_API_BASE_PATH}/${uuid}/pdf`;
  return getRaw(url);
};
