import { ISDIALOGMOTE_API_BASE_PATH } from '../globals/paths';
import { get, post } from '@/api/axios';

export const postLestBrev = (uuid) => {
  const url = `${ISDIALOGMOTE_API_BASE_PATH}/${uuid}/les`;
  return post(url);
};

export const getBrev = () => {
  return get(ISDIALOGMOTE_API_BASE_PATH);
};

export const getBrevPdf = (uuid) => {
  const url = `${ISDIALOGMOTE_API_BASE_PATH}/${uuid}/pdf`;
  return get(url, { responseType: 'blob' });
};
