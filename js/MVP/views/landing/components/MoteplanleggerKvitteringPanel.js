import { Hovedknapp } from 'nav-frontend-knapper';
import ModalWrapper from 'nav-frontend-modal';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';
import BekreftelseKvittering from '../../moteplanlegger/components/BekreftelseKvittering';
import { BRUKER } from '../../../../enums/moteplanleggerDeltakerTyper';
import { motePt } from '../../../../propTypes';
import { BEKREFTET, getSvarsideModus, MOTESTATUS } from '../../../../utils/moteUtils';
import DialogmotePanel from '../../../containers/DialogmotePanel';
import SvarKvittering from '../../moteplanlegger/components/SvarKvittering';

const SectionStyled = styled.section`
  margin: 32px 0;
`;

const texts = {
  titleSvart: 'Du har svart på tidspunkt for dialogmøte',
  textSvart:
    'Når det endelige tidspunktet er avklart, vil du få en innkalling i posten med mer informasjon om møtet. Har du behov for kontakt med NAV, kan du ???',
  buttonSvart: 'SE SVARET DITT',

  titleBekreftet: 'Bekreftelse på et tidspunkt for dialogmøte',
  textBekreftet: 'Tid og sted for dialogmøtet er avklart. Du vil mottea en innkalling i posten med mer informasjon.',
  buttonBekreftet: 'SE BEKREFTELSEN',
};

const getMotePlanleggingsKvitteringInnhold = (modus, mote) => {
  if (modus === BEKREFTET) {
    return <BekreftelseKvittering mote={mote} />;
  }
  if (modus === MOTESTATUS) {
    return <SvarKvittering mote={mote} />;
  }
  return null;
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
      <Hovedknapp onClick={() => setIsModalOpen(true)} mini>
        {buttonText}
      </Hovedknapp>

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

const MoteplanleggerKvitteringPanel = ({ mote, modus }) => {
  const [isOpen, setIsOpen] = useState(false);
  if (modus === BEKREFTET) {
    return (
      <Panel
        title={texts.titleBekreftet}
        text={texts.titleBekreftet}
        icon="kalender-innkalling"
        buttonText={texts.buttonBekreftet}
        setIsModalOpen={setIsOpen}
        isModalOpen={isOpen}
        mote={mote}
      />
    );
  }

  if (modus === MOTESTATUS) {
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
  }
  return null;
};

MoteplanleggerKvitteringPanel.propTypes = { mote: motePt, modus: PropTypes.string };

export default MoteplanleggerKvitteringPanel;
