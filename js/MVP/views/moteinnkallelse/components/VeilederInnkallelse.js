import React from 'react';
import Veileder from 'nav-frontend-veileder';
import styled from 'styled-components';
import VeilederAvatar from '../../../../components/svg/VeilederAvatar';
import { statiskeURLer } from '@/MVP/globals/paths';
import Lenke from 'nav-frontend-lenker';
import { trackOnClick } from '@/amplitude/amplitude';
import { eventNames } from '@/amplitude/events';

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
      <Lenke
        href={statiskeURLer.SYKMELDT_URL}
        target="_blank"
        onClick={() => trackOnClick(eventNames.lesMerOmSykefravaer)}
      >
        {texts.veilederUrl}
      </Lenke>
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
