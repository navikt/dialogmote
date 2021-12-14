import { get } from '@/api/axios';
import { SYFOOPPFOLGINGSPLANSERVICE_API } from '@/MVP/globals/paths';
import { useQuery } from 'react-query';
import { Sykmelding } from '@/api/types/sykmeldingerTypes';

const SYKMELDINGER = 'sykmeldinger';

export const useSykmeldinger = () => {
  const fetchSykmeldinger = () => get<Sykmelding[]>(SYFOOPPFOLGINGSPLANSERVICE_API);
  return useQuery(SYKMELDINGER, fetchSykmeldinger);
};
