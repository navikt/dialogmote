import React from 'react';
import styled from 'styled-components';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import PropTypes from 'prop-types';

const texts = {
    covid: 'Koronavirus og dialogmøter',
    intiative: 'Under pandemien vil ikke NAV ta initiativ til dialogmøter.',
    evaluate: 'Vi vurderer likevel om møte skal holdes hvis en av partene ønsker det. Møtet vil gjennomføres på telefon eller video.',
    doctor: 'Legen blir bare innkalt hvis legen selv har bedt om møte.',
    parties: 'Innkalte parter skal få beskjed fra NAV hvis møtet endres til telefon- eller videomøte.',
    phone: 'Møtet vil gjennomføres på telefon eller video.',
};

export const MOTEBEHOV = 'MOTEBEHOV';
export const MOTEPLANLEGGER = 'MOTEPLANLEGGER';
export const MOTEPLANLEGGER_KVITTERING = 'MOTEPLANLEGGER_KVITTERING';

const Title = styled.h3`
    margin: 0;
`;

const List = styled.ul`
    padding-left: 1em;
`;

const Luft = styled.div`
    margin-bottom: 1em;
`;

const KoronaInfoboks = ({ type }) => {
    const typeA = [texts.intiative, texts.evaluate, texts.doctor];
    const typeB = [texts.phone, texts.doctor];
    const typeC = [texts.phone, texts.parties, texts.doctor];

    let elements = [];

    if (type === MOTEBEHOV) {
        elements = typeA;
    }
    if (type === MOTEPLANLEGGER) {
        elements = typeB;
    }
    if (type === MOTEPLANLEGGER_KVITTERING) {
        elements = typeC;
    }

    return (
        <Luft>
            <AlertStripeInfo>
                <Title>{texts.covid}</Title>
                <List>
                    {elements.map((text) => {
                        return <li>{text}</li>;
                    })}
                </List>
            </AlertStripeInfo>
        </Luft>
    );
};

KoronaInfoboks.propTypes = {
    type: PropTypes.string,
};

export default KoronaInfoboks;
