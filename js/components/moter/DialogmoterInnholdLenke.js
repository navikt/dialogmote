import React from 'react';
import { Link } from 'react-router';

const texts = {
  panel: {
    title: 'Dialogmøte',
  },
};

const DialogmoterInnholdLenke = () => {
  return (
    <div className="dialogmoterInnholdLenke blokk--l">
      <article aria-labelledby="dialogmoter-mote">
        <Link className="inngangspanel" to="/dialogmote/mote">
          <span className="dialogmoterInnholdLenke__ikon">
            <img src={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/kalender-bgblaa.svg`} alt="Kalender" />
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
