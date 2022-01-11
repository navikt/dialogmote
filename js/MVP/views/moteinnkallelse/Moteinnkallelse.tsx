import VeilederSpeechBubble from '@/MVP/components/VeilederSpeechBubble';
import React, { ReactElement } from 'react';
import styled from 'styled-components';
import AlertStripe from 'nav-frontend-alertstriper';
import { brevTypes } from '../../globals/constants';
import DialogmoteContainer from '../../containers/DialogmoteContainer';
import { useBrev } from '../../queries/brev';
import AppSpinner from '../../../components/AppSpinner';
import DocumentContainer from '../../containers/DocumentContainer';
import VeilederInnkallelseContent from './components/VeilederInnkallelseContent';
import { innkallelseBreadcrumb } from '../../globals/paths';
import { isDateInPast } from '../../utils';
import NoInnkallelseAlert from './components/NoInnkallelseAlert';
import FeilAlertStripe from '@/MVP/components/FeilAlertStripe';
import SvarPaInnkallelse from './components/SvarPaInnkallelse';

const AlertStripeStyled = styled(AlertStripe)`
  margin-bottom: 32px;
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

const title = (type: string): string => {
  switch (type) {
    case brevTypes.AVLYST:
      return texts.avlystTitle;
    case brevTypes.ENDRING:
      return texts.endringTitle;
    default:
      return texts.innkallingtitle;
  }
};

const Moteinnkallelse = (): ReactElement => {
  const brev = useBrev();

  if (brev.isError) {
    return (
      <DialogmoteContainer title={title('')} breadcrumb={innkallelseBreadcrumb(title(''))} displayTilbakeknapp>
        <FeilAlertStripe />
      </DialogmoteContainer>
    );
  }

  if (brev.isSuccess) {
    const brevHead = brev.data[0];
    const { tid, uuid, brevType, document, lestDato, videoLink, svar } = brevHead;

    if (!brevHead || brevType === brevTypes.REFERAT) {
      return (
        <DialogmoteContainer
          title={title(brevType)}
          breadcrumb={innkallelseBreadcrumb(title(brevType))}
          displayTilbakeknapp
        >
          <NoInnkallelseAlert />;
        </DialogmoteContainer>
      );
    }

    if (brevType === brevTypes.AVLYST) {
      return (
        <DialogmoteContainer
          title={title(brevType)}
          breadcrumb={innkallelseBreadcrumb(title(brevType))}
          displayTilbakeknapp
        >
          <AvlystDocumentContainerStyled document={document} lestDato={lestDato} uuid={uuid} />
        </DialogmoteContainer>
      );
    }
    return (
      <DialogmoteContainer
        title={title(brevType)}
        breadcrumb={innkallelseBreadcrumb(title(brevType))}
        displayTilbakeknapp
      >
        {isDateInPast(tid) && <AlertStripeStyled type="advarsel">{texts.pastDateAlertBox}</AlertStripeStyled>}

        <DocumentContainer document={document} lestDato={lestDato} uuid={uuid} />

        <SvarPaInnkallelse brevUuid={uuid} svarType={svar?.svarType} />

        {videoLink && <VeilederSpeechBubble content={<VeilederInnkallelseContent />} />}
      </DialogmoteContainer>
    );
  }
  return <AppSpinner />;
};

export default Moteinnkallelse;
