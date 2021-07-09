import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import DialogmotePanel from '../../../containers/DialogmotePanel';
import ButtonLenke from '../../../components/ButtonLenke';
import { MOTEINNKALLING_URL_MVP } from '../../../globals/paths';
import { motePtMVP } from '../../../../propTypes';
import { AVLYSNING } from '../../../globals/constants';

const SectionStyled = styled.section`
  margin: 32px 0;
`;

const texts = {
  title: 'Innkalling til dialogmøte',
  text:
    'I innkallingen kan du lese om når møtet vil finne sted, om hva dere skal snakke om i møtet, og om hva du bør gjøre før møtet.',
  button: 'LES INNKALLINGEN',
  titleAvlysning: 'Avlysning av dialogmøte',
  textAvlysning:
    'Et dialogmøte du var innkalt til er blitt avlyst. Du kan lese om detaljene i avlysningsbrevet. (skriv bedre tekst her)',
  buttonAvlysning: 'LES AVLYSNINGEN',
};

const Panel = ({ title, text, icon, buttonText }) => {
  return (
    <DialogmotePanel title={title} icon={icon}>
      <SectionStyled>{text}</SectionStyled>
      <ButtonLenke mini to={MOTEINNKALLING_URL_MVP}>
        {buttonText}
      </ButtonLenke>
    </DialogmotePanel>
  );
};

Panel.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.string,
  buttonText: PropTypes.string,
};

const MoteinnkallelsePanel = ({ innkallelse }) => {
  if (innkallelse.brevType === AVLYSNING) {
    return (
      <Panel
        title={texts.titleAvlysning}
        text={texts.textAvlysning}
        icon="kalender-innkalling_avlyst"
        buttonText={texts.buttonAvlysning}
      />
    );
  }

  return <Panel title={texts.title} text={texts.text} icon="kalender-innkalling" buttonText={texts.button} />;
};

MoteinnkallelsePanel.propTypes = { innkallelse: motePtMVP };

export default MoteinnkallelsePanel;
