import React, { Fragment } from 'react';
import { Link } from 'react-router';
import {
    getLedetekst,
    Utvidbar,
} from '@navikt/digisyfo-npm';
import { motebehovPt } from '../../../propTypes';
import { FELTER } from './SvarMotebehovSkjema';
import { tilLesbarDatoMedArstallOgUkedag } from '../../../utils/datoUtils';

export const MotebehovKvitteringUtvidbar = (
    {
        motebehov,
    },
) => {
    const { motebehovSvar } = motebehov;
    return (
        <Utvidbar
            className="motebehovKvitteringUtvidbar"
            tittel={getLedetekst('mote.moteBehovKvitteringUtvidbar.tittel')}>
            <div>
                { motebehov.opprettetDato
                && <h4>{tilLesbarDatoMedArstallOgUkedag(motebehov.opprettetDato)}</h4>
                }

                { motebehovSvar.harMotebehov !== undefined
                && (
                    <Fragment>
                        <h5 className="skjemaelement__sporsmal">{FELTER.harMotebehov.spoersmaal}</h5>
                        <p>
                            {`${motebehovSvar.harMotebehov
                                ? FELTER.harMotebehov.svar[0].tekst
                                : FELTER.harMotebehov.svar[1].tekst
                            }`}
                        </p>
                    </Fragment>
                )
                }

                { motebehovSvar.forklaring
                && (
                    <Fragment>
                        <h5 className="skjemaelement__sporsmal">
                            {FELTER.forklaring.spoersmaal}
                        </h5>
                        <p>{motebehovSvar.forklaring}</p>
                    </Fragment>
                )
                }
            </div>
        </Utvidbar>
    );
};
MotebehovKvitteringUtvidbar.propTypes = {
    motebehov: motebehovPt,
};

const MotebehovKvittering = (
    {
        motebehov,
    },
) => {
    return (
        <Fragment>
            <div className="panel motebehovKvittering">
                <div className="illustrertTittel">
                    <img
                        className="illustrertTittel__img"
                        src={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/hake-groenn--lys.svg`}
                        alt="hake"
                    />
                    <h2 className="illustrertTittel__tittel">
                        {getLedetekst('mote.moteBehovKvittering.tittel')}
                    </h2>
                </div>

                <p>{getLedetekst('sykefravaer.motebehovKvittering.tekst')}</p>

                <MotebehovKvitteringUtvidbar motebehov={motebehov} />
            </div>
            <div className="knapperad">
                <Link className="lenke" to="/sykefravaer/dialogmoter">
                Tilbake
                </Link>
            </div>
        </Fragment>
    );
};
MotebehovKvittering.propTypes = {
    motebehov: motebehovPt,
};

export default MotebehovKvittering;
