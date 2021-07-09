import React from 'react';
import styled from 'styled-components';
import AlertStripe, { AlertStripeInfo } from 'nav-frontend-alertstriper';
import Lenke from 'nav-frontend-lenker';
import { AVLYSNING, ENDRING, INNKALLELSE } from '../../globals/constants';
import DialogmoteContainer from '../../containers/DialogmoteContainer';
import { useBrev } from '../../hooks/moteinnkallelse';
import AppSpinner from '../../../components/AppSpinner';
import DocumentContainer from '../../containers/DocumentContainer';
import ButtonLenke from '../../components/ButtonLenke';
import VeilederInnkallelse from './components/VeilederInnkallelse';
import LestInnkallelseCheckbox from './components/LestInnkallelseCheckbox';
import { innkallelseBreadcrumb } from '../../globals/paths';

const AlertStripeStyled = styled(AlertStripe)`
  margin-top: 32px;
`;

const InfoStripeStyled = styled(AlertStripeInfo)`
  margin-top: 32px;
`;

const texts = {
  pastDateAlertBox: 'Denne innkallingen er utdatert. Du har fått en ny melding med oppdatert informasjon.',
  infoBox: 'Det er obligatorisk å delta i dialogmøter i løpet av sykefraværet. Passer ikke møtetidspunktet? ',
  infoBoxUrl: 'Ta kontakt for å gjøre en ny avtale.',
};

const title = (type) => {
  switch (type) {
    case AVLYSNING:
      return 'Avlysning av dialogmøte';
    case ENDRING:
      return 'Endret møtetidspunkt for dialogmøte';
    default:
      return 'Innkalling til dialogmøte';
  }
};

const breadcrumbTitle = (type) => {
  switch (type) {
    case AVLYSNING:
      return 'Avlysning av dialogmøte';
    case ENDRING:
      return 'Endret dialogmøte';
    default:
      return 'Innkalling til dialogmøte';
  }
};

const isDateInPast = (dateTime) => {
  const date = new Date(dateTime);
  const today = new Date();

  return today > date;
};

const Moteinnkallelse = () => {
  const { data, status } = useBrev();

  if (status !== 'success') {
    return <AppSpinner />;
  }

  const innkallelse = data[0];
  const { tid, uuid, brevType } = innkallelse;

  return (
    <DialogmoteContainer title={title()} breadcrumb={innkallelseBreadcrumb(breadcrumbTitle(brevType))}>
      {isDateInPast(tid) && <AlertStripeStyled type="advarsel">{texts.pastDateAlertBox}</AlertStripeStyled>}

      <DocumentContainer document={innkallelse.document}>
        {isDateInPast(tid) && (
          <LestInnkallelseCheckbox type={brevType} varselUuid={uuid} isRead={!!innkallelse.lestDato} />
        )}
      </DocumentContainer>

      {(brevType === INNKALLELSE || brevType === ENDRING) && (
        <InfoStripeStyled>
          {texts.infoBox}
          <Lenke>{texts.infoBoxUrl}</Lenke>
        </InfoStripeStyled>
      )}

      <ButtonLenke mini to="/mvp">
        rompe
      </ButtonLenke>

      <VeilederInnkallelse />
    </DialogmoteContainer>
  );
};

Moteinnkallelse.propTypes = {};

export default Moteinnkallelse;
