import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Tekstomrade from 'nav-frontend-tekstomrade';
import DialogmotePanel from '../../../containers/DialogmotePanel';
import ButtonLenke from '../../../components/ButtonLenke';
import { MOTEREFERAT_URL } from '../../../globals/paths';

const DialogmotePanelStyled = styled(DialogmotePanel)`
  margin-top: 32px;
`;

const TekstomradeStyled = styled(Tekstomrade)`
  margin: 32px 0;
`;

const texts = {
  text: 'Referatet oppsummerer det dere snakket om i dialogmøtet. (Skriv bedre tekst her)',
  button: 'LES REFERATET',
};

const title = (date) => {
  return `Referat fra dialogmøtet ${date}`;
};

const MotereferatPanel = ({ date }) => {
  return (
    <DialogmotePanelStyled title={title(date)} icon="dokument">
      <TekstomradeStyled>{texts.text}</TekstomradeStyled>
      <ButtonLenke mini to={MOTEREFERAT_URL}>
        {texts.button}
      </ButtonLenke>
    </DialogmotePanelStyled>
  );
};

MotereferatPanel.propTypes = { date: PropTypes.string };

export default MotereferatPanel;
