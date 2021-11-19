import React, { ReactElement } from 'react';
import { statiskeURLer } from '@/MVP/globals/paths';
import Lenke from 'nav-frontend-lenker';
import { trackOnClick } from '@/amplitude/amplitude';
import { eventNames } from '@/amplitude/events';
import { Element } from 'nav-frontend-typografi';

const texts = {
  veilederText1: 'Har du blitt kalt inn til et videomøte med NAV?',
  veilederText2: 'Les denne veiledningen, så du er forberedt til møtestart. ',
  veilederLink1: 'Slik deltar du i videomøte med NAV.',
};

function VeilederInnkallelseContent(): ReactElement {
  return (
    <React.Fragment>
      <Element>{texts.veilederText1}</Element>
      {texts.veilederText2}
      <Lenke
        href={statiskeURLer.VIDEOMOTE_INFO_URL}
        target="_blank"
        onClick={() => trackOnClick(eventNames.lesMerOmSykefravaer)}
      >
        {texts.veilederLink1}
      </Lenke>
      <br />
    </React.Fragment>
  );
}

export default VeilederInnkallelseContent;
