import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import DialogmotePanel from '../../../containers/DialogmotePanel';
import RouterLenke from '../../../components/RouterLenke';
import { MOTEREFERAT_URL } from '@/MVP/globals/paths';
import { getLongDateFormat, getProgrammaticDateFormat } from '../../../utils';
import { DokumentImage } from '@/images/imageComponents';

const DialogmotePanelStyled = styled(DialogmotePanel)`
  margin-top: 32px;
`;

const ListStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const texts = {
  title: 'Referat fra tidligere dialogmøter',
  linkText: 'Referat fra møtet',
};

const MotereferatList = ({ referatDates }) => {
  return (
    <ListStyled>
      {referatDates.map((date) => {
        const programmaticDate = getProgrammaticDateFormat(date);
        const formattedDate = getLongDateFormat(date);

        return (
          <RouterLenke
            key={date}
            trackingName={texts.linkText}
            to={`${MOTEREFERAT_URL}/${programmaticDate}`}
          >{`${texts.linkText} ${formattedDate}`}</RouterLenke>
        );
      })}
    </ListStyled>
  );
};

MotereferatList.propTypes = { referatDates: PropTypes.array };

const PreviousMotereferatPanel = ({ previousReferatDates }) => {
  if (previousReferatDates.length === 0) return null;

  return (
    <DialogmotePanelStyled title={texts.title} icon={DokumentImage}>
      <MotereferatList referatDates={previousReferatDates} />
    </DialogmotePanelStyled>
  );
};

PreviousMotereferatPanel.propTypes = { previousReferatDates: PropTypes.array };

export default PreviousMotereferatPanel;
