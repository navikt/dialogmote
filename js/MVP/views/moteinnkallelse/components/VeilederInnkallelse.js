import React from 'react';
import Veileder from 'nav-frontend-veileder';
import styled from 'styled-components';
import VeilederAvatar from '../../../../components/svg/VeilederAvatar';
import { statiskeURLer } from '../../../globals/paths';
import { TrackedLenke } from '../../../../components/buttons/TrackedLenke';

const VeilederStyled = styled(Veileder)`
  max-width: 576px;
  align-self: center;
  margin: 64px 0;
`;

const texts = {
  veileder: 'Du kan lese mer om dialogmøter og hva som ellers skjer i løpet av sykefraværet på ',
  veilederUrl: statiskeURLer.SYKMELDT_URL,
};

const VeilederContent = () => {
  return (
    <React.Fragment>
      {texts.veileder}
      <TrackedLenke href={statiskeURLer.SYKMELDT_URL} target="_blank">
        {texts.veilederUrl}
      </TrackedLenke>
    </React.Fragment>
  );
};

function VeilederInnkallelse() {
  return (
    <VeilederStyled tekst={<VeilederContent />} posisjon="høyre" storrelse="S" fargetema="info" hvitSnakkeboble>
      <VeilederAvatar />
    </VeilederStyled>
  );
}

export default VeilederInnkallelse;
