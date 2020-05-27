import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import styled from 'styled-components';

const TEKSTER = {
    tittel: 'Trenger dere et dialogmøte med NAV?',
    undertekst: 'I møtet går vi gjennom situasjonen sammen og ser på muligheter.',
    knappKvittering: 'Se Kvittering',
    knappBehov: 'Vurder behov for møte',
};

const MotebehovInnholdLenkeStyled = styled.div`
    text-align: center;
`;

const MotebehovInnholdLenke = (
    {
        skalViseKvittering,
    },
) => {
    const knappTekstNokkel = skalViseKvittering
        ? TEKSTER.knappKvittering
        : TEKSTER.knappBehov;
    return (
        <MotebehovInnholdLenkeStyled className="motebehovInnholdLenke panel">
            <h2 className="panel__tittel">{TEKSTER.tittel}</h2>
            <p>{TEKSTER.undertekst}</p>
            <Link
                className="knapp"
                to="/dialogmote/behov"
            >
                {knappTekstNokkel}
            </Link>
        </MotebehovInnholdLenkeStyled>
    );
};
MotebehovInnholdLenke.propTypes = {
    skalViseKvittering: PropTypes.bool,
};

export default MotebehovInnholdLenke;
