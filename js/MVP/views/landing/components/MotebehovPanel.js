import React, { useState } from 'react';
import styled from 'styled-components';
import Tekstomrade from 'nav-frontend-tekstomrade';
import PropTypes from 'prop-types';
import { Hovedknapp } from 'nav-frontend-knapper';
import ModalWrapper from 'nav-frontend-modal';
import { MOTEBEHOV_URL } from '../../../globals/paths';
import ButtonLenke from '../../../components/ButtonLenke';
import DialogmotePanel from '../../../containers/DialogmotePanel';
import MeldMotebehovKvittering from './Motebehov/MeldMotebehovKvittering';

const DialogmotePanelStyled = styled(DialogmotePanel)`
  margin-bottom: 32px;
`;

const TekstomradeStyled = styled(Tekstomrade)`
  margin: 32px 0;
`;

const texts = {
  title: 'Trenger dere et dialogmøte med NAV?',
  button: 'VURDER BEHOV FOR MØTE',
  text: `Målet med et dialogmøtet er å oppsummere hva som har skjedd til nå, og snakke om hva som kan hjelpe deg å komme tilbake til arbeid.\n\nØnsker du å snakke med NAV om sykepenger eller noe annet, kan du gå hit for å kontakte oss på andre måter; www.nav.no`,
  titleSvart: 'Du har gitt svar om ditt møtebehov',
  buttonSvart: 'SE SVARET DITT',
  textSvart:
    'Vi vil bruke svaret ditt når vi vurderer om det er nødvendig med dialogmøte. Hører du fra oss, mener vi det er behov for  møtes.',
};

const MotebehovPanel = ({ motebehov }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data } = motebehov;

  if (data.motebehov) {
    return (
      <DialogmotePanelStyled title={texts.titleSvart} icon="behov">
        <TekstomradeStyled>{texts.textSvart}</TekstomradeStyled>

        <ModalWrapper
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          closeButton
          contentLabel="Møtebhov kvittering"
        >
          <div style={{ padding: '2rem 2.5rem' }}>
            <MeldMotebehovKvittering motebehov={data} />
          </div>
        </ModalWrapper>

        <Hovedknapp mini onClick={() => setIsModalOpen(true)}>
          {texts.buttonSvart}
        </Hovedknapp>
      </DialogmotePanelStyled>
    );
  }

  return (
    <DialogmotePanelStyled title={texts.title} icon="behov">
      <TekstomradeStyled>{texts.text}</TekstomradeStyled>
      <ButtonLenke mini to={MOTEBEHOV_URL}>
        {texts.button}
      </ButtonLenke>
    </DialogmotePanelStyled>
  );
};

MotebehovPanel.propTypes = { motebehov: PropTypes.object };

export default MotebehovPanel;
