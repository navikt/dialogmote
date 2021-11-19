import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getBrev, postLestBrev } from '../services/brev';

const BREV = 'brev';

export const useBrev = () => {
  return useQuery(BREV, getBrev);
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
