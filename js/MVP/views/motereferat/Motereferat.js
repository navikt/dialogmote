import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Knapp } from 'nav-frontend-knapper';
import DialogmoteContainer from '../../containers/DialogmoteContainer';
import DocumentContainer from '../../containers/DocumentContainer';
import LinkInfoBox from './components/LinkInfoBox';
import { useBrev } from '../../hooks/moteinnkallelse';
import AppSpinner from '../../../components/AppSpinner';
import { REFERAT } from '../../globals/constants';
import { getShortDate } from '../../utils';
import VeilederReferat from './components/VeilederReferat';
import { motereferatBreadcrumb } from '../../globals/paths';
import { getReferatPdf, getReferatTest } from '../../services/referat';
import Icon from '../../components/Icon';

const texts = {
  title: 'Referat fra dialogmøte',
};

const reducer = (acc, curr) => {
  const { tid } = curr;
  const shortDate = getShortDate(tid);

  const newAcc = { ...acc, [shortDate]: curr };

  return newAcc;
};

const getReferat = (varsler, date) => {
  const referater = varsler.filter((hendelse) => hendelse.brevType === REFERAT);

  if (referater.length === 0) {
    // TODO
    return [];
  }

  if (!date) {
    return referater[0];
  }

  const referatIndexed = referater.reduce(reducer, {});
  const referat = referatIndexed[date];

  if (!referat) {
    // TODO
    return [];
  }
  return referat;
};

const handleClick = async (uuid) => {
  // const testData = await getReferatTest();
  // console.log(testData);

  const data = await getReferatPdf(uuid);
  const { FileName, FileBytes } = data;

  const binaryString = window.atob(FileBytes);
  const bytes = new Uint8Array(binaryString.length);
  const datas = bytes.map((byte, i) => binaryString.charCodeAt(i));

  const blob = new Blob([datas]);

  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', FileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

const Motereferat = ({ params }) => {
  const { data, status } = useBrev();
  const [downloadingPDF, setDownloadingPDF] = useState(false);

  if (status === 'loading') {
    return <AppSpinner />;
  }

  const dateParam = params.date;
  const referat = getReferat(data, dateParam);
  const { uuid, document } = referat;

  return (
    <DialogmoteContainer title={texts.title} breadcrumb={motereferatBreadcrumb}>
      <DocumentContainer document={document} />
      <Knapp onClick={() => handleClick(uuid)} autoDisableVedSpinner spinner={downloadingPDF} mini>
        <Icon icon="download" rightPadding="8px" />
        LAST NED PDF
      </Knapp>
      <LinkInfoBox />
      <VeilederReferat />
    </DialogmoteContainer>
  );
};

Motereferat.propTypes = {
  params: PropTypes.object,
};

export default Motereferat;
