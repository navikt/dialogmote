import React from 'react';
import { ForDuSvarerImage } from '@/images/imageComponents';

/* eslint-disable max-len */
export const TEKSTER = {
  forDuSvarer: {
    tittel: 'Før du svarer',
    lagetPlan: 'Har dere laget en oppfølgingsplan? Husk å dele den med NAV nå.',
    ikkeLagetPlan: 'Er oppfølgingsplanen ikke laget?',
  },
  tekstInformasjonInnhold: {
    lenke: 'Opprett en ny plan.',
  },
};
/* eslint-enable max-len */

export const TekstInformasjonBilde = () => {
  return (
    <div className="tekstInformasjon__bilde">
      <img src={ForDuSvarerImage} alt="Kalender" />
    </div>
  );
};

export const TekstInformasjonInnhold = () => {
  return (
    <div className="tekstInformasjon__innhold">
      <h2 className="tekstInformasjon__tittel">{TEKSTER.forDuSvarer.tittel}</h2>
      <ul>
        <li>{TEKSTER.forDuSvarer.lagetPlan}</li>
        <li>
          {TEKSTER.forDuSvarer.ikkeLagetPlan}{' '}
          <a className="lenke" href={process.env.REACT_APP_OPPFOLGINGSPLAN_CONTEXT_ROOT}>
            {TEKSTER.tekstInformasjonInnhold.lenke}
          </a>
        </li>
      </ul>
    </div>
  );
};

const MotebehovInfoForSvar = () => {
  return (
    <div className="panel motebehovInfoForSvar">
      <TekstInformasjonBilde />
      <TekstInformasjonInnhold />
    </div>
  );
};

export default MotebehovInfoForSvar;
