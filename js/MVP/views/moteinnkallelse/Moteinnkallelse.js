import VeilederSpeechBubble from '@/MVP/components/VeilederSpeechBubble';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import AlertStripe, { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { brevTypes } from '../../globals/constants';
import DialogmoteContainer from '../../containers/DialogmoteContainer';
import { useBrev, useMutateBrevLest } from '../../hooks/brev';
import AppSpinner from '../../../components/AppSpinner';
import DocumentContainer from '../../containers/DocumentContainer';
import VeilederInnkallelseContent from './components/VeilederInnkallelseContent';
import { innkallelseBreadcrumb, statiskeURLer } from '../../globals/paths';
import { isDateInPast } from '../../utils';
import NoInnkallelseAlert from './components/NoInnkallelseAlert';
import Lenke from 'nav-frontend-lenker';
import { trackOnClick } from '@/amplitude/amplitude';
import { eventNames } from '@/amplitude/events';

const AlertStripeStyled = styled(AlertStripe)`
  margin-bottom: 32px;
`;

const InfoStripeStyled = styled(AlertStripeInfo)`
  margin-top: 32px;
`;

const AvlystDocumentContainerStyled = styled(DocumentContainer)`
  margin-bottom: 32px;
`;

const texts = {
  pastDateAlertBox: 'Denne innkallingen er utdatert.',
  infoBox: 'Det er obligatorisk å delta i dialogmøter i løpet av sykefraværet. Passer ikke møtetidspunktet? ',
  infoBoxUrl: 'Ta kontakt for å gjøre en ny avtale.',
  avlystTitle: 'Avlysning av dialogmøte',
  endringTitle: 'Endret dialogmøte',
  innkallingtitle: 'Innkalling til dialogmøte',
};

const title = (type) => {
  switch (type) {
    case brevTypes.AVLYST:
      return texts.avlystTitle;
    case brevTypes.ENDRING:
      return texts.endringTitle;
    default:
      return texts.innkallingtitle;
  }
};

const breadcrumbTitle = (type) => {
  switch (type) {
    case brevTypes.AVLYST:
      return texts.avlystTitle;
    case brevTypes.ENDRING:
      return texts.endringTitle;
    default:
      return texts.innkallingtitle;
  }
};

const Moteinnkallelse = () => {
  const brev = useBrev();
  const mutation = useMutateBrevLest();

  const brevHead = Array.isArray(brev.data) ? brev.data[0] : null;
  const { tid, uuid, brevType, document, lestDato } = brevHead;

  useEffect(() => {
    if (lestDato === null) {
      mutation.mutate({ uuid });
    }
  }, [lestDato, mutation, uuid]);

  if (brev.isLoading) {
    return <AppSpinner />;
  }

  if (brev.isError) {
    return (
      <DialogmoteContainer title={title()} breadcrumb={innkallelseBreadcrumb(breadcrumbTitle())} displayTilbakeknapp>
        <AlertStripeStyled type="feil">
          Akkurat nå mangler det noe her. Vi har tekniske problemer som vi jobber med å løse. Prøv gjerne igjen om en
          stund.
        </AlertStripeStyled>
      </DialogmoteContainer>
    );
  }

  if (!brevHead || brevType === brevTypes.REFERAT) {
    return (
      <DialogmoteContainer title={title()} breadcrumb={innkallelseBreadcrumb(breadcrumbTitle())} displayTilbakeknapp>
        <NoInnkallelseAlert />;
      </DialogmoteContainer>
    );
  }

  if (brevType === brevTypes.AVLYST) {
    return (
      <DialogmoteContainer
        title={title(brevType)}
        breadcrumb={innkallelseBreadcrumb(breadcrumbTitle(brevType))}
        displayTilbakeknapp
      >
        <AvlystDocumentContainerStyled document={document} />
      </DialogmoteContainer>
    );
  }

  return (
    <DialogmoteContainer
      title={title(brevType)}
      breadcrumb={innkallelseBreadcrumb(breadcrumbTitle(brevType))}
      displayTilbakeknapp
    >
      {isDateInPast(tid) && <AlertStripeStyled type="advarsel">{texts.pastDateAlertBox}</AlertStripeStyled>}

      <DocumentContainer document={document} />

      <InfoStripeStyled>
        {texts.infoBox}
        <Lenke href={statiskeURLer.KONTAKT_INFO_URL} onClick={() => trackOnClick(eventNames.kontaktOss)}>
          {texts.infoBoxUrl}
        </Lenke>
      </InfoStripeStyled>

      <VeilederSpeechBubble content={<VeilederInnkallelseContent />} />
    </DialogmoteContainer>
  );
};

Moteinnkallelse.propTypes = {};

export default Moteinnkallelse;
