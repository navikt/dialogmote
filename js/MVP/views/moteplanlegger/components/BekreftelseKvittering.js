import React from 'react';
import { motePt } from '../../../../propTypes';
import { visDato, visKlokkeslett } from '../../../../utils/datoUtils';

const texts = {
  tid: 'Tid: ',
  sted: 'Sted: ',
  info: 'Du vil om kort tid få en innkalling i posten med mer informasjon.',
};

const BekreftelseKvittering = ({ mote }) => {
  const tid = `${visDato(mote.bekreftetAlternativ.tid).toLowerCase()} kl. ${visKlokkeslett(
    mote.bekreftetAlternativ.tid
  )}`;

  return (
    <p>
      {texts.tid} {tid}
      <br />
      {texts.sted} {mote.bekreftetAlternativ.sted}
      <br />
      <br />
      {texts.info}
    </p>
  );
};

BekreftelseKvittering.propTypes = {
  mote: motePt,
};

export default BekreftelseKvittering;
