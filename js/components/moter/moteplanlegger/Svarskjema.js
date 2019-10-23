import React from 'react';
import PropTypes from 'prop-types';
import { FieldArray, reduxForm } from 'redux-form';
import Alertstripe from 'nav-frontend-alertstriper';
import { Hovedknapp } from 'nav-frontend-knapper';
import {
    getLedetekst,
    Utvidbar,
} from '@navikt/digisyfo-npm';
import Ikon from 'nav-frontend-ikoner-assets';
import { Link } from 'react-router';
import {
    motePt,
    moteplanleggerDeltakertypePt,
} from '../../../propTypes';
import {
    SVARSKJEMANAVN,
    getNyeAlternativer,
    getTidligereAlternativer,
} from '../../../utils/moteUtils';
import { BRUKER } from '../../../enums/moteplanleggerDeltakerTyper';
import Motested from './Motested';
import Alternativer from './Alternativer';
import BesvarteTidspunkter from './BesvarteTidspunkter';
import MinstEttTidspunktContainer from './MinstEttTidspunkt';
import getContextRoot from '../../../utils/getContextRoot';

const texts = {
    personvern: `
        Ifølge folketrygdloven kan NAV innkalle deg og arbeidsgiveren din til dialogmøte for å drøfte hvordan du kan komme tilbake til jobb. 
        Her kan du svare på hvilke tidspunkter som passer for deg.
    `,
    lenke: 'Les om hvordan vi behandler personopplysningene dine.',
    husk: 'Husk at NAV skal ha mottatt en oppfølgingsplan senest en uke før møtet.',
    konklusjon: `
        Vi har konkludert med at det bør holdes dialogmøte selv om du tidligere har svart nei på behovet. 
        Vi har sett på svarene fra deg og arbeidsgiveren din og på andre opplysninger vi har om sykefraværet.
    `,
    cancel: 'Avbryt',
};

export function getData(values) {
    return values.alternativer.map((alternativ) => {
        if (alternativ
            && typeof alternativ.verdi === 'number'
            && alternativ.avkrysset === true
        ) {
            return alternativ.verdi;
        }
        return undefined;
    })
        .filter((id) => {
            return id !== undefined;
        });
}

export const Skjema = (
    {
        handleSubmit,
        mote,
        sendSvar,
        sender,
        sendingFeilet,
        touch,
        autofill,
        deltakertype = BRUKER,
    },
) => {
    const deltaker = mote.deltakere.filter((d) => {
        return d.type === deltakertype;
    })[0];
    const onSubmit = (values) => {
        const data = getData(values);
        sendSvar(mote.moteUuid, deltakertype, data);
    };
    const tidligereAlternativer = getTidligereAlternativer(mote, deltakertype);

    const previous = () => {
        const oldPath = window.location.pathname.split('/');
        const newPath = oldPath.slice(0, oldPath.length - 1).join('/');
        return newPath;
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ padding: '1rem', marginBottom: '1rem' }}>
                <p>{texts.personvern}</p>
                <p><a href="https://www.nav.no/personvern">{texts.lenke}</a></p>
            </div>
            <div className="tidOgSted">
                {!!tidligereAlternativer.length
                && (
                    <div className="panel">
                        {texts.konklusjon}
                    </div>
                )
                }
                <div className="panel tidOgSted__sted">
                    <Motested sted={deltaker.svar[0].sted} />
                </div>
                <div className="panel tidOgSted__alternativer">
                    <FieldArray
                        name="tidspunkter"
                        deltakertype={deltakertype}
                        component={Alternativer}
                        alternativer={getNyeAlternativer(mote, deltakertype)}
                        mote={mote}
                        touch={touch}
                        autofill={autofill}
                    />
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <Ikon kind="info-sirkel-fyll" />
                        <span style={{
                            paddingLeft: '0.5em',
                            fontWeight: 'bold',
                        }}>
                            {texts.husk}
                        </span>
                    </div>
                </div>
            </div>
            {tidligereAlternativer.length > 0
            && (
                <Utvidbar
                    tittel="Tidligere foreslåtte tidspunkter"
                    className="blokk"
                    visLukklenke={false}>
                    <BesvarteTidspunkter
                        alternativer={tidligereAlternativer}
                        mote={mote}
                    />
                </Utvidbar>
            )
            }
            {deltakertype === BRUKER && <MinstEttTidspunktContainer />}
            <div aria-live="polite" role="alert">
                {sendingFeilet
                && (
                    <Alertstripe type="advarsel">
                        <p className="sist">{getLedetekst('mote.skjema.innsending.feilet')}</p>
                    </Alertstripe>
                )
                }
            </div>
            <div className="knapperad">
                <Hovedknapp
                    className="js-submit"
                    htmlType="submit"
                    disabled={sender}
                    spinner={sender}>
                    {getLedetekst('mote.skjema.send-svar-knapp')}
                </Hovedknapp>
                <div>
                    <a href={previous()}>{texts.cancel}</a>
                </div>
            </div>
        </form>
    );
};

Skjema.propTypes = {
    handleSubmit: PropTypes.func,
    mote: motePt,
    sendSvar: PropTypes.func,
    deltakertype: moteplanleggerDeltakertypePt,
    sender: PropTypes.bool,
    sendingFeilet: PropTypes.bool,
    touch: PropTypes.func,
    autofill: PropTypes.func,
};

const harValgtIngen = (values) => {
    return values.alternativer.filter((alternativ) => {
        return alternativ
            && alternativ.verdi === 'ingen'
            && alternativ.avkrysset === true;
    }).length > 0;
};

const harValgtDato = (values) => {
    return values.alternativer.filter((alternativ) => {
        return alternativ
            && alternativ.verdi !== 'ingen'
            && alternativ.avkrysset === true;
    }).length > 0;
};

export function validate(values) {
    const feilmeldinger = {};
    const alternativer = values.alternativer || [];
    const antallAvkryssede = alternativer.filter((alternativ) => {
        return alternativ && alternativ.avkrysset === true;
    }).length;
    if (!values.alternativer || antallAvkryssede === 0) {
        feilmeldinger.tidspunkter = {
            _error: 'Du må velge minst ett alternativ',
        };
    } else if (harValgtIngen(values) && harValgtDato(values)) {
        feilmeldinger.tidspunkter = {
            _error: 'Du har valgt alternativer som utelukker hverandre',
        };
    }
    return feilmeldinger;
}

const Svarskjema = reduxForm({
    form: SVARSKJEMANAVN,
    validate,
})(Skjema);

export default Svarskjema;
