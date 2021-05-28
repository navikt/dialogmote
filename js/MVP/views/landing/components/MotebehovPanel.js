import React from 'react';
import styled from 'styled-components';
import Tekstomrade from 'nav-frontend-tekstomrade';
import { MOTEBEHOV_URL } from '../../../globals/paths';
import ButtonLenke from '../../../components/ButtonLenke';
import DialogmotePanel from '../../../containers/DialogmotePanel';

const TekstomradeStyled = styled(Tekstomrade)`
  margin: 32px 0;
`;

const texts = {
  title: 'Trenger dere et dialogmøte med NAV?',
  button: 'VURDER BEHOV FOR MØTE',
};

const MotebehovPanel = () => {
  return (
    <DialogmotePanel title={texts.title} icon="behov">
      <TekstomradeStyled>
        {`Målet med et dialogmøtet er å oppsummere hva som har skjedd til nå, og snakke om hva som kan hjelpe deg å komme tilbake til arbeid.\n\nØnsker du å snakke med NAV om sykepenger eller noe annet, kan du gå hit for å kontakte oss på andre måter; www.nav.no`}
      </TekstomradeStyled>
      <ButtonLenke mini to={MOTEBEHOV_URL}>
        {texts.button}
      </ButtonLenke>
    </DialogmotePanel>
  );
};

export default MotebehovPanel;
