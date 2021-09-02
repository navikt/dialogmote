import React from 'react';
import Lenke from 'nav-frontend-lenker';
import styled from 'styled-components';
import Veileder from 'nav-frontend-veileder';
import VeilederAvatar from '../../../../components/svg/VeilederAvatar';
import { getSykefravaerUrl } from '../../../../utils/urlUtils';

const VeilederStyled = styled(Veileder)`
  max-width: 576px;
  align-self: center;
  margin: 64px 0;
`;

const texts = {
  veilederText1: 'Lurer du på hva som skjer underveis i sykefraværet?',
  veilederText2: 'Ta gjerne en titt på denne ',
  veilederText3: 'Du kan også ',
  veilederLink1: 'tidslinjen.',
  veilederLink2: 'kontakte oss.',
};

const tidslinjeURL = getSykefravaerUrl('/sykefravaer/tidslinjen');

const VeilederContent = () => {
  // eslint-disable-next-line no-console
  console.log(tidslinjeURL);
  return (
    <React.Fragment>
      {texts.veilederText1}
      <br />
      {texts.veilederText2}
      <Lenke href={tidslinjeURL} target="_blank">
        {texts.veilederLink1}
      </Lenke>
      <br />
      <br />
      {texts.veilederText3}
      <Lenke href="https://www.nav.no/person/kontakt-oss/nb/skriv-til-oss" target="_blank">
        {texts.veilederLink2}
      </Lenke>
    </React.Fragment>
  );
};

function VeilederReferat() {
  return (
    <VeilederStyled tekst={<VeilederContent />} posisjon="høyre" storrelse="S" fargetema="info" hvitSnakkeboble>
      <VeilederAvatar />
    </VeilederStyled>
  );
}

export default VeilederReferat;
