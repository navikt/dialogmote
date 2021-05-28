import React from 'react';
import styled from 'styled-components';
import AlertStripe from 'nav-frontend-alertstriper';
import Lenke from 'nav-frontend-lenker';
import PropTypes from 'prop-types';
import { OPPFOLGINGSPLANER_URL } from '../../../../globals/paths';
import { getLongMonthDateFormat } from '../../../../utils';

const AlertstripeStyled = styled(AlertStripe)`
  margin-top: 1rem;
`;

const texts = {
  heading1: 'Kvittering for møtebehov',
  heading2: 'Ditt svar',
  text1: 'Du har sendt beskjed til NAV om at du ønsker et dialogmøte.',
  text2: 'En veileder ved NAV-kontoret vil ta kontakt med deg.',
  alertstripe: 'Husk å dele oppfølgingsplanen med NAV før møtet.',
  oppfolgingsplanlink: 'Gå til oppfølgingsplanen.',
};

const MeldMotebehovKvittering = ({ motebehov }) => {
  return (
    <React.Fragment>
      <h2>{texts.heading1}</h2>
      <p>
        {texts.text1}
        <br />
        {texts.text2}
      </p>
      <h3>{texts.heading2}</h3>
      <div />
      <AlertstripeStyled type="info">
        {texts.alertstripe}
        <br />
        <Lenke href={OPPFOLGINGSPLANER_URL}>{texts.oppfolgingsplanlink}</Lenke>
      </AlertstripeStyled>
    </React.Fragment>
  );
};
MeldMotebehovKvittering.propTypes = { motebehov: PropTypes.object };

export default MeldMotebehovKvittering;
