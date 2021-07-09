import { get, post } from '../../data/gateway-api/gatewayApi';
import { getCookie } from '../../utils';
import { ISDIALOGMOTE_API_BASE_PATH } from '../globals/paths';
import { ISDIALOGMOTE_TOKEN_NAME } from '../globals/config';

export const postLestBrev = async (uuid) => {
  const url = `${ISDIALOGMOTE_API_BASE_PATH}/${uuid}/les`;
  const authToken = getCookie(ISDIALOGMOTE_TOKEN_NAME);
  const headers = { bearer: authToken };

  return post(url, {}, headers);
};

export const getBrev = async () => {
  const url = ISDIALOGMOTE_API_BASE_PATH;
  return get(url);
};
