import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getBrev, postLestBrev } from '../services/brev';

const MOTEINNKALLELSE = 'moteinnkallelse';

export const useBrev = () => {
  return useQuery(MOTEINNKALLELSE, getBrev, {
    staleTime: 10000,
  });
};

const setLestDatoForVarsel = (uuid) => {
  return (varsel) => {
    if (varsel.uuid === uuid) {
      return { ...varsel, lestDato: '123' };
    }

    return varsel;
  };
};

export const useMutatebrevLest = () => {
  const queryClient = useQueryClient();

  return useMutation(({ uuid }) => postLestBrev(uuid), {
    onSuccess: (_data, variables) => {
      queryClient.setQueryData([MOTEINNKALLELSE], (old) => {
        return old.map(setLestDatoForVarsel(variables.uuid));
      });
    },
  });
};
