import VeilederSpeechBubble from '@/MVP/components/VeilederSpeechBubble';
import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Knapp } from 'nav-frontend-knapper';
import Icon from '../../../components/Icon';
import { pdfTypes } from '@/MVP/globals/constants';
import NoReferatAlert from './NoReferatAlert';
import { downloadBrevPdf, getProgrammaticDateFormat } from '../../../utils';
import DocumentContainer from '../../../containers/DocumentContainer';
import LinkInfoBox from './LinkInfoBox';
import VeilederReferatContent from './VeilederReferatContent';
import { DownloadImage } from '@/images/imageComponents';
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
  const [downloadingPDF, setDownloadingPDF] = useState(false);

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
  const { uuid, document, tid, lestDato } = referat;

  return (
    <React.Fragment>
      <DocumentContainer document={document} lestDato={lestDato} uuid={uuid} />

      <KnappStyled
        onClick={() => {
          handleClick(uuid, getProgrammaticDateFormat(tid));
          trackOnClick(eventNames.lastNedReferat);
        }}
        autoDisableVedSpinner
        spinner={downloadingPDF}
        mini
      >
        <Icon icon={DownloadImage} rightPadding="8px" />
        {texts.downloadButton}
      </KnappStyled>

      <LinkInfoBox documentKeys={getDocumentKeys(document)} />
      <VeilederSpeechBubble content={<VeilederReferatContent />} />
    </React.Fragment>
  );
};

MotereferatContent.propTypes = { referat: PropTypes.object, narmestelederId: PropTypes.string };

export default MotereferatContent;
