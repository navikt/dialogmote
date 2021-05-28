import { useQuery } from 'react-query';
import { getReferatPdf } from '../services/referat';

const MOTEREFERAT_PDF = 'motereferatPDF';

export const useMotereferatPDF = () => {
  return useQuery(MOTEREFERAT_PDF, getReferatPdf, {
    staleTime: 10000,
    enabled: false,
  });
};
