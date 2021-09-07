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
  heading: 'Svaret ditt om møtebehov',
};

const Content = (data) => {
  const { skjemaType } = data;
  const { motebehov } = data;
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
        <p>Jeg har behov for et møte med NAV.</p>
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
