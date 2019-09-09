import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const TEKSTER = {
    tittel: 'Trenger dere et dialogmøte med NAV?',
    undertekst: 'I møtet går vi gjennom situasjonen sammen og ser på muligheter.',
    knappKvittering: 'Se Kvittering',
    knappBehov: 'Meld behov for møte',
};

const MotebehovInnholdLenke = (
    {
        skalViseKvittering,
    },
) => {
    const knappTekstNokkel = skalViseKvittering
        ? TEKSTER.knappKvittering
        : TEKSTER.knappBehov;
    return (
        <div className="motebehovInnholdLenke panel">
            <h2 className="panel__tittel">{TEKSTER.tittel}</h2>
            <p>{TEKSTER.undertekst}</p>
            <Link
                className="knapp"
                to="/dialogmote/behov"
            >
                {knappTekstNokkel}
            </Link>
        </div>
    );
};
MotebehovInnholdLenke.propTypes = {
    skalViseKvittering: PropTypes.bool,
};

export default MotebehovInnholdLenke;
