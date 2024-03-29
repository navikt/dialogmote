import React from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { moteplanleggerDeltakerPt, motePt } from '../../../propTypes';
import { BRUKER } from '@/enums/moteplanleggerDeltakerTyper';
import { finnDeltakerByType } from '@/utils/moteUtils';
import BesvarteTidspunkter from './BesvarteTidspunkter';
import Motested from './Motested';
import { MotesvarSendtImage } from '@/images/imageComponents';

const tekster = {
  tittel: 'Svaret ditt på tidspunkt for dialogmøte',
  dineSvar: 'Se dine svar',
};

const TextConfirmation = () => {
  return (
    <React.Fragment>
      Svaret ditt er sendt
      <br />– du hører fra oss
    </React.Fragment>
  );
};

/* eslint-disable max-len */
export const VeienVidereTekst = ({ deltaker }) => {
  const harDeltakerIkkeValgtSvar =
    deltaker.svar.filter((svar) => {
      return svar.valgt;
    }).length === 0;
  if (harDeltakerIkkeValgtSvar) {
    return (
      <React.Fragment>
        <p>Du har krysset av på at ingen av tidspunktene passer.</p>
        <ul>
          <li>
            NAV kan likevel innkalle deg til et av tidspunktene hvis fraværsgrunnen din ikke blir vurdert som gyldig.
          </li>
          <li>Du kan også få nye tidspunkter å velge mellom hvis det er aktuelt.</li>
        </ul>
        <p>Har du behov for kontakt med NAV, kan du ringe oss på 55 55 33 33</p>
      </React.Fragment>
    );
  }
  return (
    <p>
      Når det endelige tidspunktet er avklart, vil du få en innkalling i posten med mer informasjon om møtet. Har du
      behov for kontakt med NAV, kan du ringe oss på tlf: 55 55 33 33
    </p>
  );
};
/* eslint-enable max-len */
VeienVidereTekst.propTypes = {
  deltaker: moteplanleggerDeltakerPt,
};

const Kvittering = ({ mote }) => {
  const deltaker = finnDeltakerByType(mote.deltakere, BRUKER);
  return (
    <div>
      <header className="sidetopp">
        <h1 className="sidetopp__tittel">{tekster.tittel}</h1>
      </header>
      <div className="panel">
        <div className="illustrertTittel">
          <img className="illustrertTittel__img" src={MotesvarSendtImage} alt="" />
          <h2 className="illustrertTittel__tittel">
            <div>
              <TextConfirmation />
            </div>
          </h2>
        </div>
        <div className="redaksjonelt blokk">
          <VeienVidereTekst deltaker={deltaker} />
        </div>
        <Ekspanderbartpanel tittel={tekster.dineSvar}>
          <div>
            <div className="blokk">
              <Motested sted={deltaker.svar[0].sted} />
            </div>
            <BesvarteTidspunkter mote={mote} alternativer={mote.alternativer} />
          </div>
        </Ekspanderbartpanel>
      </div>
    </div>
  );
};

Kvittering.propTypes = {
  mote: motePt,
};

export default Kvittering;
