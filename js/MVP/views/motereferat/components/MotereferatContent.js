import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Knapp } from 'nav-frontend-knapper';
import { useMutateBrevLest } from '@/MVP/hooks/brev';
import { pdfTypes } from '@/MVP/globals/constants';
import NoReferatAlert from './NoReferatAlert';
import { downloadBrevPdf, getProgrammaticDateFormat } from '../../../utils';
import DocumentContainer from '../../../containers/DocumentContainer';
import LinkInfoBox from './LinkInfoBox';
import VeilederReferat from './VeilederReferat';
import { Download as DownloadImage } from '@navikt/ds-icons';
import { trackOnClick } from '@/amplitude/amplitude';
import { eventNames } from '@/amplitude/events';

const texts = {
  downloadButton: 'LAST NED PDF',
};

const KnappStyled = styled(Knapp)`
  margin-top: 32px;
  width: fit-content;
`;

const getDocumentKeys = (document) => {
  return document.filter(({ key }) => key).map(({ key }) => key);
};

const MotereferatContent = ({ referat }) => {
  const mutation = useMutateBrevLest();
  const [downloadingPDF, setDownloadingPDF] = useState(false);

  useEffect(() => {
    if (referat && referat.lestDato === null && !mutation.isLoading) {
      const { uuid } = referat;
      mutation.mutate({ uuid });
    }
  }, [mutation, referat]);

  const handleClick = async (uuid, dokumentDato) => {
    setDownloadingPDF(true);
    try {
      await downloadBrevPdf(uuid, dokumentDato, pdfTypes.REFERAT);
    } finally {
      setDownloadingPDF(false);
    }
  };

  if (!referat) {
    return <NoReferatAlert />;
  }
  const { uuid, document, tid } = referat;

  return (
    <React.Fragment>
      <DocumentContainer document={document} />

      <KnappStyled
        onClick={() => {
          handleClick(uuid, getProgrammaticDateFormat(tid));
          trackOnClick(eventNames.lastNedReferat);
        }}
        autoDisableVedSpinner
        spinner={downloadingPDF}
        mini
      >
        <DownloadImage />
        <span>{texts.downloadButton}</span>
      </KnappStyled>

      <LinkInfoBox documentKeys={getDocumentKeys(document)} />
      <VeilederReferat />
    </React.Fragment>
  );
};

MotereferatContent.propTypes = { referat: PropTypes.object, narmestelederId: PropTypes.string };

export default MotereferatContent;
