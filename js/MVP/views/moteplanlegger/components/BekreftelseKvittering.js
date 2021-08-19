import React from 'react';
import styled from 'styled-components';
import { BRUKER } from '../../../../enums/moteplanleggerDeltakerTyper';
import { motePt } from '../../../../propTypes';
import { visDato, visKlokkeslett } from '../../../../utils/datoUtils';

const texts = {
  title: 'Møtebekreftelse',
  hei: 'Hei',
  kontaktinfo: 'Har du spørsmål kan du kontakte oss på 55 55 33 33',
  hilsen: 'Vennlig hilsen NAV',
};

const HeaderStyled = styled.header`
  margin-bottom: 2.4rem;
  margin-top: 2.4rem;
`;

const getMoteTidOgStedString = (tidOgSted) => {
  return `Vi bekrefter møtetidspunkt ${tidOgSted}.`;
};

const BekreftelseKvittering = ({ mote }) => {
  const tidOgSted = `${visDato(mote.bekreftetAlternativ.tid).toLowerCase()} kl. ${visKlokkeslett(
    mote.bekreftetAlternativ.tid
  )} i ${
    mote.bekreftetAlternativ.sted
  }. Du vil om kort tid få en innkalling i posten med mer informasjon om dialogmøtet.`;

  const innloggetBruker = mote.deltakere.filter((deltaker) => {
    return deltaker.type === BRUKER;
  })[0];

  return (
    <React.Fragment>
      <h2>{texts.title}</h2>
      <HeaderStyled>
        <h3>
          {texts.hei} {innloggetBruker.navn}
        </h3>
      </HeaderStyled>
      <p>
        {getMoteTidOgStedString(tidOgSted)}
        <br />
        <br />
        {texts.kontaktinfo}
        <br />
        <br />
        {texts.hilsen}
      </p>
    </React.Fragment>
  );
};

BekreftelseKvittering.propTypes = {
  mote: motePt,
};

export default BekreftelseKvittering;
