import { useMutation, useQuery, useQueryClient } from 'react-query';
import { get, post } from '@/api/axios';
import { Brev, SvarRespons } from '@/api/types/brevTypes';
import { ISDIALOGMOTE_API_BASE_PATH } from '@/MVP/globals/paths';

const BREV = 'brev';

export const useBrev = () => {
  const fetchBrev = () => get<Brev[]>(ISDIALOGMOTE_API_BASE_PATH);
  return useQuery(BREV, fetchBrev);
};

export const useSvarPaInnkallelse = (uuid: string) => {
  const queryClient = useQueryClient();
  const postSvar = (uuid, svar: SvarRespons) => post(`${ISDIALOGMOTE_API_BASE_PATH}/${uuid}/respons`, svar);

  return useMutation((svar: SvarRespons) => postSvar(uuid, svar), {
    onSuccess: () => {
      queryClient.invalidateQueries(BREV);
    },
  });
};

const setLestDatoForBrev = (uuid: string) => {
  return (varsel) => {
    if (varsel.uuid === uuid) {
      return { ...varsel, lestDato: new Date().toString() };
    }

    return varsel;
  };
};

export const useMutateBrevLest = () => {
  const queryClient = useQueryClient();

  const postLestBrev = (uuid) => post(`${ISDIALOGMOTE_API_BASE_PATH}/${uuid}/les`);

  return useMutation(
    ({ uuid }) => {
      return postLestBrev(uuid);
    },
    {
      onMutate: (variables: { uuid: string }) => {
        queryClient.setQueryData(BREV, (old: string[]) => {
          return old.map(setLestDatoForBrev(variables.uuid));
        });
      },
    }
  );
};

export const getBrevPdf = (uuid) => {
  const url = `${ISDIALOGMOTE_API_BASE_PATH}/${uuid}/pdf`;
  return get(url, { responseType: 'blob' });
};
