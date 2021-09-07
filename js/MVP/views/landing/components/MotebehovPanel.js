import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Knapp } from 'nav-frontend-knapper';
import ModalWrapper from 'nav-frontend-modal';
import AlertStripe from 'nav-frontend-alertstriper';
import Lenke from 'nav-frontend-lenker';
import { MOTEBEHOV_URL, OPPFOLGINGSPLANER_URL } from '../../../globals/paths';
import ButtonLenke from '../../../components/ButtonLenke';
import DialogmotePanel from '../../../containers/DialogmotePanel';
import MotebehovKvittering from './Motebehov/MotebehovKvittering';

const DialogmotePanelStyled = styled(DialogmotePanel)`
  margin-bottom: 32px;
`;

const TekstomradeStyled = styled.p`
  margin: 32px 0;
`;

const AlertstripeStyled = styled(AlertStripe)`
  margin: 32px 0;
`;

const texts = {
  title: 'Trenger dere et dialogmøte med NAV?',
  button: 'VURDER BEHOV FOR MØTE',
  text1: `Målet med et dialogmøtet er å oppsummere hva som har skjedd til nå, og snakke om hva som kan hjelpe deg å komme tilbake til arbeid.`,
  text2: `Ønsker du å snakke med NAV om sykepenger eller noe annet, kan du `,
  link: 'gå hit for å kontakte oss på andre måter.',
  titleSvart: 'Du har gitt svar om ditt møtebehov',
  buttonSvart: 'SE SVARET DITT',
  textSvart:
    'Vi vil bruke svaret ditt når vi vurderer om det er nødvendig med dialogmøte. Hører du fra oss, mener vi det er behov for møtes.',
  alertstripe: 'Husk å dele oppfølgingsplanen med NAV før møtet.',
  oppfolgingsplanlink: 'Gå til oppfølgingsplanen.',
};

const text = () => {
  return (
    <TekstomradeStyled>
      {texts.text1}
      <br />
      <br />
      {texts.text2}
      <Lenke href="www.vg.no" target="_blank">
        {texts.link}
      </Lenke>
    </TekstomradeStyled>
  );
};

const MotebehovPanel = ({ motebehov }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data } = motebehov;

  const modalStyle = { padding: '2rem 2.5rem', maxWidth: '576px' };

  if (data.motebehov) {
    return (
      <DialogmotePanelStyled title={texts.titleSvart} icon="behov">
        <TekstomradeStyled>{texts.textSvart}</TekstomradeStyled>

        <ModalWrapper
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          closeButton
          contentLabel="Møtebehov modal"
          onAfterOpen={() => {
            document.getElementsByClassName('lukknapp')[0].focus();
          }}
          appElement={document.getElementsByClassName('app')[0]}
        >
          <div style={modalStyle}>
            <MotebehovKvittering motebehov={data} />
          </div>
        </ModalWrapper>

        <AlertstripeStyled type="info">
          {texts.alertstripe}
          <br />
          <Lenke href={OPPFOLGINGSPLANER_URL}>{texts.oppfolgingsplanlink}</Lenke>
        </AlertstripeStyled>

        <Knapp mini onClick={() => setIsModalOpen(true)}>
          {texts.buttonSvart}
        </Knapp>
      </DialogmotePanelStyled>
    );
  }

  return (
    <DialogmotePanelStyled title={texts.title} icon="behov">
      {text()}
      <ButtonLenke mini to={MOTEBEHOV_URL}>
        {texts.button}
      </ButtonLenke>
    </DialogmotePanelStyled>
  );
};

MotebehovPanel.propTypes = { motebehov: PropTypes.object };

export default MotebehovPanel;
