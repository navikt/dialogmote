import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Hovedknapp } from 'nav-frontend-knapper';
import ModalWrapper from 'nav-frontend-modal';
import DialogmotePanel from '../../../containers/DialogmotePanel';

const SectionStyled = styled.section`
  margin: 32px 0;
`;

const texts = {
  title: 'Tidspunkt for dialogmøte',
  text: 'Her er forslag til tidspunkt for dialogmøte. Sjekk om det passer og svar på forslaget.',
  button: 'LES TODO',
  titleSvart: 'Du har svart på tidspunkt for dialogmøte',
  textSvart:
    'Når det endelige tidspunktet er avklart, vil du få en innkalling i posten med mer informasjon om møtet. Har du behov for kontakt med NAV, kan du TODO',
  buttonSvart: 'SE SVARET DITT',
};

const Modal = ({ isOpen, setIsOpen }) => {
  return (
    <ModalWrapper isOpen={isOpen} onRequestClose={() => setIsOpen(false)} closeButton contentLabel="TODO">
      <div style={{ padding: '2rem 2.5rem' }}>Innhold her</div>
    </ModalWrapper>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};

const Panel = ({ title, text, icon, buttonText, setIsModalOpen, isModalOpen }) => {
  return (
    <DialogmotePanel title={title} icon={icon}>
      <SectionStyled>{text}</SectionStyled>
      <Hovedknapp onClick={() => setIsModalOpen(true)} mini>
        {buttonText}
      </Hovedknapp>
      <Modal setIsOpen={setIsModalOpen} isOpen={isModalOpen} />
    </DialogmotePanel>
  );
};

Panel.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.string,
  buttonText: PropTypes.string,
  setIsModalOpen: PropTypes.func,
  isModalOpen: PropTypes.bool,
};

const MoteplanleggerPanel = ({ status = 'SVART' }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (status === 'SVART') {
    return (
      <Panel
        title={texts.titleSvart}
        text={texts.textSvart}
        icon="kalender-innkalling"
        buttonText={texts.buttonSvart}
        setIsModalOpen={setIsOpen}
        isModalOpen={isOpen}
      />
    );
  }

  return <Panel title={texts.title} text={texts.text} icon="kalender-innkalling" buttonText={texts.button} />;
};

MoteplanleggerPanel.propTypes = { status: PropTypes.string };

export default MoteplanleggerPanel;
