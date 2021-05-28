import Lenke from 'nav-frontend-lenker';
import Veileder from 'nav-frontend-veileder';
import styled from 'styled-components';
import React from 'react';
import VeilederAvatar from '../../../../components/svg/VeilederAvatar';

const VeilederStyled = styled(Veileder)`
  max-width: 576px;
  align-self: center;
  margin-bottom: 64px;
`;

const texts = {
  veileder:
    'I et dialogmøte går vi gjennom situasjonen og planlegger veien videre. De som deltar, er du, lederen din og en veileder fra NAV-kontoret, eventuelt også den som sykmelder deg. ',
  veilederUrl: 'Les mer om dialogmøter',
};

const VeilederContent = () => {
  return (
    <React.Fragment>
      {texts.veileder}
      <br />
      <Lenke href="" target="_blank">
        {texts.veilederUrl}
      </Lenke>
    </React.Fragment>
  );
};

const VeilederLanding = () => {
  return (
    <VeilederStyled tekst={<VeilederContent />} posisjon="høyre" storrelse="S" fargetema="info" hvitSnakkeboble>
      <VeilederAvatar />
    </VeilederStyled>
  );
};

export default VeilederLanding;
