import { useQuery } from 'react-query';
import { getSyfoopfolgingsplanservice } from '../services/sykmeldinger';

const SYKMELDINGER = 'sykmeldinger';

export const useSykmeldinger = () => {
  return useQuery(SYKMELDINGER, getSyfoopfolgingsplanservice);
};
