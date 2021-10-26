import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getBrev, postLestBrev } from '../services/brev';

const BREV = 'brev';

export const useBrev = () => {
  return useQuery(BREV, getBrev);
};

const setLestDatoForVarsel = (uuid) => {
  return (varsel) => {
    if (varsel.uuid === uuid) {
      return { ...varsel, lestDato: new Date().toString() };
    }

    return varsel;
  };
};

export const useMutateBrevLest = () => {
  const queryClient = useQueryClient();

  return useMutation(({ uuid }) => postLestBrev(uuid), {
    onMutate: (variables) => {
      queryClient.setQueryData(BREV, (old) => {
        return old.map(setLestDatoForVarsel(variables.uuid));
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries(BREV);
    },
  });
};
