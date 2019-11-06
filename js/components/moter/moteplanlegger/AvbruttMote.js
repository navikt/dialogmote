import React from 'react';
import {
    getLedetekst,
    getHtmlLedetekst,
} from '@navikt/digisyfo-npm';
import { motePt } from '../../../propTypes';
import { visDato, visKlokkeslett } from '../../../utils/datoUtils';

export const forklarendeTekst = (mote) => {
    return mote.bekreftetTidspunkt
        ? getHtmlLedetekst('mote.avbruttmote.sykmeldt.bekreftet_sa_avbrutt')
        : getHtmlLedetekst('mote.avbruttmote.sykmeldt.avbrutt');
};

const AvbruttMote = (
    {
        mote,
    },
) => {
    const deltakertypeSuffix = 'arbeidstaker';
    const harDuSporsmalNokkel = `mote.avbruttmote.har_du_sporsmal.${deltakertypeSuffix}`;
    return (
        <div>
            <header className="sidetopp">
                <h1 className="sidetopp__tittel">{getLedetekst('mote.avbruttmote.tittel')}</h1>
            </header>
            <div className="panel">
                <div className="illustrertTittel">
                    <img className="illustrertTittel__img" src={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/mote_avbrutt.svg`} alt="" />
                    <h2 className="illustrertTittel__tittel">{getLedetekst('mote.avbruttmote.undertittel')}</h2>
                </div>
                <div dangerouslySetInnerHTML={forklarendeTekst(mote)} />
                <div className="adskilt__blokk blokk">
                    <h3 className="typo-element">{getLedetekst('mote.avbruttmote.tidspunkter_det_gjelder')}</h3>
                    <div className="kvittering__svar blokk">
                        { mote.alternativer.map((alternativ) => {
                            return (
                                // eslint-disable-next-line jsx-a11y/label-has-associated-control
                                <label key={alternativ.id} className="avbrutt__mote__svar">
                                    {`${visDato(alternativ.tid)} ${getLedetekst('mote.kvittering.kl')} ${visKlokkeslett(alternativ.tid)}`}
                                </label>
                            );
                        })
                        }
                    </div>
                    <h3 className="typo-element">{getLedetekst('mote.avbruttmote.motested')}</h3>
                    <p>{mote.alternativer[0].sted}</p>
                </div>
                <p>{getLedetekst(harDuSporsmalNokkel)}</p>
            </div>
        </div>
    );
};

AvbruttMote.propTypes = {
    mote: motePt,
};

export default AvbruttMote;
