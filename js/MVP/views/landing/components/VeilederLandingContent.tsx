import React, { ReactElement } from 'react';
import { statiskeURLer } from '@/MVP/globals/paths';
import Lenke from 'nav-frontend-lenker';
import { trackOnClick } from '@/amplitude/amplitude';
import { eventNames } from '@/amplitude/events';

const texts = {
  veileder:
    'I et dialogmøte oppsummerer vi hva som har skjedd mens du har vært sykmeldt, og vi planlegger veien videre. De som deltar, er du, lederen din og en veileder fra NAV-kontoret, eventuelt også den som sykmelder deg. ',
  veilederUrl: 'Les mer om dialogmøter',
};

const VeilederLandingContent = (): ReactElement => {
  return (
    <React.Fragment>
      {texts.veileder}
      <Lenke
        href={statiskeURLer.DIALOGMOTE_INFO_URL}
        target="_blank"
        onClick={() => trackOnClick(eventNames.lesMerOmDialogmoter)}
      >
        {texts.veilederUrl}
      </Lenke>
    </React.Fragment>
  );
};

export default VeilederLandingContent;
