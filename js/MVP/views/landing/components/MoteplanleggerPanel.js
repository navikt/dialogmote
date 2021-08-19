import { Hovedknapp } from 'nav-frontend-knapper';
import ModalWrapper from 'nav-frontend-modal';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';
import BekreftelseKvittering from '../../moteplanlegger/components/BekreftelseKvittering';
import { BRUKER } from '../../../../enums/moteplanleggerDeltakerTyper';
import { motePt } from '../../../../propTypes';
import { BEKREFTET, getSvarsideModus, MOTESTATUS } from '../../../../utils/moteUtils';
import ButtonLenke from '../../../components/ButtonLenke';
import DialogmotePanel from '../../../containers/DialogmotePanel';
import { MOTEPLANLEGGINGSSTATUS_URL } from '../../../globals/paths';
import SvarKvittering from '../../moteplanlegger/components/SvarKvittering';

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

const getMotePlanleggingsKvitteringInnhold = (modus, mote) => {
  if (modus === BEKREFTET) {
    return <BekreftelseKvittering mote={mote} />;
  }
  if (modus === MOTESTATUS) {
    return <SvarKvittering mote={mote} />;
  }
};

const Modal = ({ isOpen, setIsOpen, content }) => {
  return (
    <ModalWrapper
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      closeButton
      contentLabel="Møteplanlegger kvittering"
    >
      <div style={{ padding: '2rem 2.5rem', width: '31rem' }}>{content}</div>
    </ModalWrapper>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  content: PropTypes.object,
};

const Panel = ({ title, text, icon, buttonText, setIsModalOpen, isModalOpen, mote }) => {
  const modus = getSvarsideModus(mote, BRUKER);

  return (
    <DialogmotePanel title={title} icon={icon}>
      <SectionStyled>{text}</SectionStyled>
      {modus === BEKREFTET || modus === MOTESTATUS ? (
        <Hovedknapp onClick={() => setIsModalOpen(true)} mini>
          {buttonText}
        </Hovedknapp>
      ) : (
        <ButtonLenke mini to={MOTEPLANLEGGINGSSTATUS_URL}>
          {buttonText}
        </ButtonLenke>
      )}
      <Modal
        setIsOpen={setIsModalOpen}
        isOpen={isModalOpen}
        content={getMotePlanleggingsKvitteringInnhold(modus, mote)}
      />
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
  mote: motePt,
};

const MoteplanleggerPanel = ({ mote }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Panel
      title={texts.titleSvart}
      text={texts.textSvart}
      icon="kalender-innkalling"
      buttonText={texts.buttonSvart}
      setIsModalOpen={setIsOpen}
      isModalOpen={isOpen}
      mote={mote}
    />
  );
};

MoteplanleggerPanel.propTypes = { mote: motePt };

export default MoteplanleggerPanel;
