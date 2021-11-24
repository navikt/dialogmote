import React from 'react';
import { Link } from 'react-router';
import { trackOnClick } from '@/amplitude/amplitude';
import { BlaaKalenderImage } from '@/images/imageComponents';
import { LANDING_URL } from '@/MVP/globals/paths';

const texts = {
  panel: {
    title: 'Dialogmøte',
    trackingName: 'Lenke til dialogmøte',
  },
};

const DialogmoterInnholdLenke = () => {
  return (
    <div className="dialogmoterInnholdLenke blokk--l">
      <article aria-labelledby="dialogmoter-mote">
        <Link className="inngangspanel" to={`${LANDING_URL}/mote`} onClick={() => trackOnClick(texts.trackingName)}>
          <span className="dialogmoterInnholdLenke__ikon">
            <img src={BlaaKalenderImage} alt="Kalender" />
          </span>
          <div className="inngangspanel__innhold">
            <header className="inngangspanel__header">
              <h2 className="js-title inngangspanel_undertekst" id="dialogmoter-mote">
                {texts.panel.title}
              </h2>
            </header>
          </div>
        </Link>
      </article>
    </div>
  );
};

export default DialogmoterInnholdLenke;
