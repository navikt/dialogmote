import React from 'react';
import PropTypes from 'prop-types';
import { Element } from 'nav-frontend-typografi';
import { getFullDateFormat } from '../../../../utils';
import {
  KvitteringForklaring,
  getHarBehovKvittering,
} from '../../../../../components/moter/motebehov/MotebehovKvitteringUtvidbar';
import { skjemaTypes } from '../../../../globals/constants';
import { getBehovSvarText } from '../../../../../components/moter/motebehov/svarmotebehov/SvarMotebehovKvittering';

const texts = {
  heading: 'Svaret ditt om behov for møte',
  content: 'Jeg har behov for et møte med NAV.',
};

const Content = ({ skjemaType, motebehov }) => {
  const { opprettetDato } = motebehov;
  const { forklaring } = motebehov.motebehovSvar;

  const dateElement = () => {
    return opprettetDato ? (
      <section>
        <Element>{getFullDateFormat(opprettetDato)}</Element>
        <br />
      </section>
    ) : null;
  };

  if (skjemaType === skjemaTypes.MELD_BEHOV) {
    return (
      <React.Fragment>
        {dateElement()}
        <p>{texts.content}</p>
        {KvitteringForklaring(forklaring)}
      </React.Fragment>
    );
  }

  const behovSvarText = getBehovSvarText(motebehov);

  return (
    <React.Fragment>
      {dateElement()}
      {getHarBehovKvittering(behovSvarText, true)}
      {KvitteringForklaring(forklaring)}
    </React.Fragment>
  );
};

Content.propTypes = { skjemaType: PropTypes.string, motebehov: PropTypes.object };

const MotebehovKvittering = ({ motebehov }) => {
  const content = Content(motebehov);

  return (
    <React.Fragment>
      <h2>{texts.heading}</h2>

      {content}
    </React.Fragment>
  );
};
MotebehovKvittering.propTypes = { motebehov: PropTypes.object };

export default MotebehovKvittering;
