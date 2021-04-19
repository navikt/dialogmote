import React from 'react';
import styled from 'styled-components';
import AlertStripe from 'nav-frontend-alertstriper';
import { motebehovReducerPt } from '../../../../propTypes';
import { FELTER } from './MeldMotebehovSkjema';
import { oppfolgingsplanUrl } from '../../../../utils/urlUtils';
import MotebehovKvitteringUtvidbar from '../MotebehovKvitteringUtvidbar';

const tekster = {
  motebehovKvittering: {
    tittel: 'Svaret ditt er sendt',
    tekst1: 'Du har sendt beskjed til NAV om at du ønsker et dialogmøte.',
    tekst2: 'En veileder ved NAV-kontoret vil ta kontakt med deg.',
  },
  alertstripe: 'Husk å dele oppfølgingsplanen med NAV før møtet.',
  oppfolgingsplanlink: 'Gå til oppfølgingsplanen.',
};

const AlertstripeStyled = styled(AlertStripe)`
  margin-top: 1rem;
`;

const MeldMotebehovKvittering = ({ motebehovReducer }) => {
  return (
    <div className="panel motebehovKvittering">
      <h2 className="motebehovKvittering_tittel">{tekster.motebehovKvittering.tittel}</h2>

      <p>
        {tekster.motebehovKvittering.tekst1}
        <br />
        {tekster.motebehovKvittering.tekst2}
      </p>

      <MotebehovKvitteringUtvidbar motebehovReducer={motebehovReducer} harBehovSvar={FELTER.harMotebehov.svar.tekst} />

      <AlertstripeStyled type="info">
        {tekster.alertstripe}
        <br />
        <a className="lenke" href={oppfolgingsplanUrl()}>
          {tekster.oppfolgingsplanlink}
        </a>
      </AlertstripeStyled>
    </div>
  );
};
MeldMotebehovKvittering.propTypes = {
  motebehovReducer: motebehovReducerPt,
};

export default MeldMotebehovKvittering;
