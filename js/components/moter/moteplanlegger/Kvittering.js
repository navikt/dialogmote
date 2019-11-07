import React from 'react';
import {
    getHtmlLedetekst,
    Utvidbar,
} from '@navikt/digisyfo-npm';
import { motePt } from '../../../propTypes';
import { BRUKER } from '../../../enums/moteplanleggerDeltakerTyper';
import { finnDeltakerByType } from '../../../utils/moteUtils';
import BesvarteTidspunkter from './BesvarteTidspunkter';
import Motested from './Motested';

const tekster = {
    tittel: 'Kvittering',
    dineSvar: 'Se dine svar',
};

export const getVeienVidereTekst = (deltaker) => {
    return deltaker.svar.filter((svar) => {
        return svar.valgt;
    }).length === 0
        ? getHtmlLedetekst('mote.kvittering.hva_skjer_videre.innhold.ingenalternativpasser.v3.arbeidstaker')
        : getHtmlLedetekst('mote.kvittering.hva_skjer_videre.innhold.v2.arbeidstaker');
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
                    <img
                        className="illustrertTittel__img"
                        src={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/motesvarSendt.svg`}
                        alt=""
                    />
                    <h2 className="illustrertTittel__tittel">
                        <div dangerouslySetInnerHTML={getHtmlLedetekst('mote.kvittering.svaret-ditt-er-sendt.v2')} />
                    </h2>
                </div>
                <div
                    dangerouslySetInnerHTML={getVeienVidereTekst(deltaker)}
                    className="redaksjonelt blokk"
                />
                <Utvidbar tittel={tekster.dineSvar}>
                    <div>
                        <div className="blokk">
                            <Motested sted={deltaker.svar[0].sted} />
                        </div>
                        <BesvarteTidspunkter
                            mote={mote}
                            alternativer={mote.alternativer}
                        />
                    </div>
                </Utvidbar>
            </div>
        </div>
    );
};

Kvittering.propTypes = {
    mote: motePt,
};

export default Kvittering;
