import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import DialogmotePanel from '../../../containers/DialogmotePanel';
import RouterLenke from '../../../components/RouterLenke';
import { MOTEREFERAT_URL } from '../../../globals/paths';

const DialogmotePanelStyled = styled(DialogmotePanel)`
  margin-top: 32px;
`;

const SectionStyled = styled.section`
  margin-top: 32px;
  margin-bottom: 8px;
`;

const ListStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const texts = {
  title: 'Referat fra tidligere dialogmøter',
  text: 'Her finner du referat fra tidligere dialogmøter du har hatt med NAV.',
};

const MotereferatList = ({ referatDates }) => {
  return (
    <ListStyled>
      {referatDates.map((date) => (
        <RouterLenke key={date} to={`${MOTEREFERAT_URL}/${date}`}>{`Referat fra møtet ${date}`}</RouterLenke>
      ))}
    </ListStyled>
  );
};

MotereferatList.propTypes = { referatDates: PropTypes.array };

const PreviousMotereferatPanel = ({ previousReferatDates }) => {
  return (
    <DialogmotePanelStyled title={texts.title} icon="dokument">
      <SectionStyled>{texts.text}</SectionStyled>
      <MotereferatList referatDates={previousReferatDates} />
    </DialogmotePanelStyled>
  );
};

PreviousMotereferatPanel.propTypes = { previousReferatDates: PropTypes.array };

export default PreviousMotereferatPanel;
