import React from 'react';
import { MoteAvbruttImage } from '@/images/imageComponents';

const texts = {
  title: 'Tidspunkt for dialogmøte',
  subTitle: 'De foreslåtte tidspunktene er passert',
  explanation:
    'Du har tidligere mottatt en møteforespørsel med tidspunkter for et dialogmøte med NAV og din arbeidsgiver. Møteforespørselen er utdatert, og du kan se bort fra denne forespørselen. Er det fortsatt aktuelt med et møte, vil du få en ny forespørsel.',
  contactInfo: 'Har du spørsmål, kan du kontakte oss på 55 55 33 33',
};

const MotePassert = () => {
  return (
    <div>
      <header className="sidetopp">
        <h1 className="sidetopp__tittel">{texts.title}</h1>
      </header>
      <div className="panel">
        <div className="illustrertTittel">
          <img className="illustrertTittel__img" src={MoteAvbruttImage} alt="" />
          <h2 className="illustrertTittel__tittel">{texts.subTitle}</h2>
        </div>
        <p>{texts.explanation}</p>
        <div className="adskilt__blokk blokk">
          <p>{texts.contactInfo}</p>
        </div>
      </div>
    </div>
  );
};

export default MotePassert;
