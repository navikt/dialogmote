import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Knapp } from 'nav-frontend-knapper';
import styled from 'styled-components';
import DialogmoteContainer from '../../containers/DialogmoteContainer';
import DocumentContainer from '../../containers/DocumentContainer';
import LinkInfoBox from './components/LinkInfoBox';
import { useBrev } from '../../hooks/brev';
import AppSpinner from '../../../components/AppSpinner';
import { brevTypes } from '../../globals/constants';
import { downloadBrevPdf, getProgrammaticDateFormat } from '../../utils';
import VeilederReferat from './components/VeilederReferat';
import { motereferatBreadcrumb } from '../../globals/paths';
import Icon from '../../components/Icon';
import NoReferatAlert from './components/NoReferatAlert';

const KnappStyled = styled(Knapp)`
  margin-top: 32px;
  width: fit-content;
`;

const texts = {
  title: 'Referat fra dialogmøte',
};

const getReferat = (brev, date) => {
  const referater = brev.filter(({ brevType }) => brevType === brevTypes.REFERAT);

  if (referater.length === 0) {
    return null;
  }

  if (!date) {
    return referater[0];
  }

  const referat = referater.find(({ tid }) => getProgrammaticDateFormat(tid) === date);

  if (!referat) {
    return null;
  }

  return referat;
};

const getDocumentKeys = (document) => {
  const documentKeys = document.filter(({ key }) => key).map(({ key }) => key);

  return documentKeys;
};

const Motereferat = ({ params }) => {
  const { data, status } = useBrev();
  const [downloadingPDF, setDownloadingPDF] = useState(false);

  const handleClick = async (uuid) => {
    setDownloadingPDF(true);
    try {
      await downloadBrevPdf(uuid);
    } finally {
      setDownloadingPDF(false);
    }
  };

  if (status === 'loading') {
    return <AppSpinner />;
  }

  const dateParam = params.date;
  const referat = getReferat(data, dateParam);

  let content;
  if (!referat) {
    content = <NoReferatAlert />;
  } else {
    const { uuid, document } = referat;

    content = (
      <React.Fragment>
        <DocumentContainer document={document} />

        <KnappStyled onClick={() => handleClick(uuid)} autoDisableVedSpinner spinner={downloadingPDF} mini>
          <Icon icon="download" rightPadding="8px" />
          LAST NED PDF
        </KnappStyled>

        <LinkInfoBox documentKeys={getDocumentKeys(document)} />
        <VeilederReferat />
      </React.Fragment>
    );
  }

  return (
    <DialogmoteContainer title={texts.title} breadcrumb={motereferatBreadcrumb}>
      {content}
    </DialogmoteContainer>
  );
};

Motereferat.propTypes = {
  params: PropTypes.object,
};

export default Motereferat;
