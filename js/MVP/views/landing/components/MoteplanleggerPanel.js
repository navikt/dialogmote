import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import ButtonLenke from '../../../components/ButtonLenke';
import DialogmotePanel from '../../../containers/DialogmotePanel';
import { MOTEPLANLEGGINGSSTATUS_URL } from '../../../globals/paths';

const SectionStyled = styled.section`
  margin: 32px 0;
`;

const texts = {
  title: 'Tidspunkt for dialogmøte',
  text: 'Her er forslag til tidspunkt for dialogmøte. Sjekk om det passer og svar på forslaget.',
  button: 'SJEKK FORSLAGET',
};

const Panel = ({ title, text, icon, buttonText }) => {
  return (
    <DialogmotePanel title={title} icon={icon}>
      <SectionStyled>{text}</SectionStyled>
      <ButtonLenke mini to={MOTEPLANLEGGINGSSTATUS_URL}>
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

const MoteplanleggerPanel = () => {
  return <Panel title={texts.title} text={texts.text} icon="kalender-innkalling" buttonText={texts.button} />;
};

MoteplanleggerPanel.propTypes = {};

export default MoteplanleggerPanel;
