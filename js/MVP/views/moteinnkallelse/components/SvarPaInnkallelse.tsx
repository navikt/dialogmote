import React from 'react';
import DittSvarPaInnkallelse from '@/MVP/views/moteinnkallelse/components/DittSvarPaInnkallelse';
import { SvarType } from '@/api/types/brevTypes';
import { GiSvarPaInnkallelse } from '@/MVP/views/moteinnkallelse/components/GiSvarPaInnkallelse';

interface SvarProps {
  svarType?: SvarType;
}
const SvarPaInnkallelse = ({ svarType }: SvarProps) => {
  return svarType ? <DittSvarPaInnkallelse svarType={svarType} /> : <GiSvarPaInnkallelse />;
};

export default SvarPaInnkallelse;
