import React, { Fragment } from 'react';
import { Utvidbar } from '@navikt/digisyfo-npm';
import { motebehovPt } from '../../../../propTypes';
import { FELTER } from './SvarMotebehovSkjema';
import { tilLesbarDatoMedArstallOgUkedag } from '../../../../utils/datoUtils';
import MotebehovKvitteringSideButtonBack from '../MotebehovKvitteringSideButtonBack';

const tekster = {
    motebehovKvittering: {
        tittel: 'Svaret ditt er sendt',
        tekst: 'Vi vil bruke svaret ditt når vi vurderer om det er nødvendig med dialogmøte. Hører du fra oss, mener vi det er behov for å møtes.',
    },
    motebehovKvitteringUtvidbar: {
        tittel: 'Se svaret ditt',
    },
};

export const MotebehovKvitteringUtvidbar = (
    {
        motebehov,
    },
) => {
    const { motebehovSvar } = motebehov;
    return (
        <Utvidbar
            className="motebehovKvitteringUtvidbar"
            tittel={tekster.motebehovKvitteringUtvidbar.tittel}>
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

const SvarMotebehovKvittering = (
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
                        {tekster.motebehovKvittering.tittel}
                    </h2>
                </div>

                <p>{tekster.motebehovKvittering.tekst}</p>

                <MotebehovKvitteringUtvidbar motebehov={motebehov} />
            </div>
            <MotebehovKvitteringSideButtonBack />
        </Fragment>
    );
};
SvarMotebehovKvittering.propTypes = {
    motebehov: motebehovPt,
};

export default SvarMotebehovKvittering;