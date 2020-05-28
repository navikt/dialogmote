import React from 'react';
import PropTypes from 'prop-types';
import { Utvidbar } from '@navikt/digisyfo-npm';
import { motebehovReducerPt } from '../../../propTypes';
import { FELTER as SVAR_MOTEBEHOV_FELTER } from './svarmotebehov/SvarMotebehovSkjema';
import { tilLesbarDatoMedArstallOgUkedag } from '../../../utils/datoUtils';

const texts = {
    motebehovKvitteringUtvidbar: {
        tittel: 'Se svaret ditt',
    },
};

const getHarBehovKvittering = (harBehovSvar, harBehovSporsmal) => {
    return harBehovSporsmal
        ? [
            <h5 className="skjemaelement__sporsmal" key={0}>{SVAR_MOTEBEHOV_FELTER.harMotebehov.spoersmaal}</h5>,
            <p key={1}>
                {harBehovSvar}
            </p>,
        ]
        : [
            <p key={1}>
                {harBehovSvar}
            </p>,
        ];
};

const KvitteringForklaring = (forklaring) => {
    const label = (
        <h5 className="skjemaelement__sporsmal">
            {SVAR_MOTEBEHOV_FELTER.forklaring.spoersmaal}
        </h5>
    );
    return (
        <React.Fragment>
            {label}
            <p>{forklaring}</p>
        </React.Fragment>
    );
};

const MotebehovKvitteringUtvidbar = (
    {
        motebehov,
        harBehovSporsmal,
        harBehovSvar,
    },
) => {
    const motebehovet = motebehov;
    const { motebehovSvar } = motebehovet;
    return (
        <Utvidbar
            className="motebehovKvitteringUtvidbar"
            tittel={texts.motebehovKvitteringUtvidbar.tittel}>
            <div>
                { motebehovet.opprettetDato
                    && <h4>{tilLesbarDatoMedArstallOgUkedag(motebehovet.opprettetDato)}</h4>
                }
                { motebehovSvar.harMotebehov !== undefined
                    && getHarBehovKvittering(harBehovSvar, harBehovSporsmal)
                }
                { motebehovSvar.forklaring
                    && KvitteringForklaring(motebehovSvar.forklaring)
                }
            </div>
        </Utvidbar>
    );
};
MotebehovKvitteringUtvidbar.propTypes = {
    motebehov: motebehovReducerPt,
    harBehovSporsmal: PropTypes.string,
    harBehovSvar: PropTypes.string,
};

export default MotebehovKvitteringUtvidbar;
