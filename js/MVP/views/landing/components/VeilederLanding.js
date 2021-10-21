import Veileder from 'nav-frontend-veileder';
import styled from 'styled-components';
import React from 'react';
import VeilederAvatar from '../../../../components/svg/VeilederAvatar';
import { statiskeURLer } from '../../../globals/paths';
import { TrackedLenke } from '../../../../components/buttons/TrackedLenke';

const VeilederStyled = styled(Veileder)`
  max-width: 576px;
  align-self: center;
  margin-bottom: 64px;
`;

const texts = {
  veileder:
    'I et dialogmøte oppsummerer vi hva som har skjedd mens du har vært sykmeldt, og vi planlegger veien videre. De som deltar, er du, lederen din og en veileder fra NAV-kontoret, eventuelt også den som sykmelder deg. ',
  veilederUrl: 'Les mer om dialogmøter',
};

const VeilederContent = () => {
  return (
    <React.Fragment>
      {texts.veileder}
      <TrackedLenke href={statiskeURLer.DIALOGMOTE_INFO_URL} target="_blank">
        {texts.veilederUrl}
      </TrackedLenke>
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
