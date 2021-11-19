import React, { ReactElement } from 'react';
import { statiskeURLer } from '@/MVP/globals/paths';
import Lenke from 'nav-frontend-lenker';
import { trackOnClick } from '@/amplitude/amplitude';
import { eventNames } from '@/amplitude/events';
import { getSykefravaerUrl } from '@/utils/urlUtils';

const texts = {
  veilederText1: 'Lurer du på hva som skjer underveis i sykefraværet?',
  veilederText2: 'Ta gjerne en titt på denne ',
  veilederText3: 'Du kan også ',
  veilederLink1: 'tidslinjen.',
  veilederLink2: 'kontakte oss.',
};

const tidslinjeURL = getSykefravaerUrl('/sykefravaer/tidslinjen');

function VeilederReferatContent(): ReactElement {
  return (
    <React.Fragment>
      {texts.veilederText1}
      <br />
      {texts.veilederText2}
      <Lenke href={tidslinjeURL} target="_blank" onClick={() => trackOnClick(eventNames.tidslinjen)}>
        {texts.veilederLink1}
      </Lenke>
      <br />
      <br />
      {texts.veilederText3}
      <Lenke href={statiskeURLer.KONTAKT_INFO_URL} target="_blank" onClick={() => trackOnClick(eventNames.kontaktOss)}>
        {texts.veilederLink2}
      </Lenke>
    </React.Fragment>
  );
}

export default VeilederReferatContent;
