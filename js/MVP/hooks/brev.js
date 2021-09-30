import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getBrev, postLestBrev } from '../services/brev';

const BREV = 'brev';

export const useBrev = () => {
  return useQuery(BREV, getBrev);
};

const setLestDatoForVarsel = (uuid) => {
  return (varsel) => {
    if (varsel.uuid === uuid) {
      return { ...varsel, lestDato: true };
    }

    return varsel;
  };
};

export const useMutatebrevLest = () => {
  const queryClient = useQueryClient();

  return useMutation(({ uuid }) => postLestBrev(uuid), {
    onSuccess: (_data, variables) => {
      queryClient.setQueryData(BREV, (old) => {
        return old.map(setLestDatoForVarsel(variables.uuid));
      });
    },
  });
};
