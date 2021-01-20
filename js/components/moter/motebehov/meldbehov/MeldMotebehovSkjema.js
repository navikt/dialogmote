import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Field,
    reduxForm,
} from 'redux-form';
import { motebehovSvarReducerPt } from '../../../../propTypes';
import Tekstomraade from '../../../skjema/Tekstomraade';
import CheckboxSelvstendig from '../../../skjema/CheckboxSelvstendig';
import MotebehovSkjemaKnapper from '../MotebehovSkjemaKnapper';
import ObligatoriskeFelterInfotekst from "../ObligatoriskeFelterInfotekst";

export const tekstfeltRegex = new RegExp('.*<[^ ][^>]+[^ ]>.*');

export const felterPt = PropTypes.shape({});

const SVAR_MOTEBEHOV_SKJEMANAVN = 'svarMotebehov';

const tekster = {
    sensitiv: 'Ikke skriv sensitiv informasjon, for eksempel detaljerte opplysninger om helsen din.',
};

const MAX_LENGTH = 1000;

export const FELTER = {
    harMotebehov: {
        navn: 'harMotebehov',
        svar: {
            tekst: 'Jeg har behov for et møte med NAV',
            verdi: true,
        },
    },
    lege: {
        navn: 'lege',
        tekst: 'Jeg ønsker at den som sykmelder meg, også skal delta i møtet.',
    },
    forklaring: {
        navn: 'forklaring',
        spoersmaal: 'Begrunnelse',
    },
};

export const MotebehovSkjemaTekstomraade = (
    {
        felt,
    },
) => {
    const sporsmaalTekst = `${felt.spoersmaal} (valgfritt)`;
    return (
        <div className="skjema_element motebehovSkjemaTekstomraade">
            <label
                className="skjemaelement__sporsmal"
                id={felt.navn}
                htmlFor={`${felt.navn}-input`}
            >
                {sporsmaalTekst}
            </label>
            <TekstSensitiv />
            <Field
                className="input--fullbredde"
                name={felt.navn}
                id={`${felt.navn}-input`}
                aria-labelledby={felt.navn}
                maxLength={MAX_LENGTH}
                component={Tekstomraade}
                placeholder="Skriv her"
                rows="5"
            />
        </div>
    );
};
MotebehovSkjemaTekstomraade.propTypes = {
    felt: felterPt,
};

export const TekstSensitiv = () => {
    return (
        <div className="svarMotebehovSkjema__tekstSensitiv">
            {tekster.sensitiv}
        </div>
    );
};
export const TekstOpplysning = () => {
    const teksterOpplysning = {
        tekstOpplysning: {
            tekst: 'Vi bruker opplysningene også til å gjøre selve tjeneste bedre. ',
            lenke: 'Les mer om hvordan NAV behandler personopplysninger.',
        },
    };
    return (
        <div className="svarMotebehovSkjema__tekstOpplysning">
            <p>
                {teksterOpplysning.tekstOpplysning.tekst}
                <a
                    className="lenke"
                    href="http://www.nav.no/personvern"
                    title="Følg lenke">
                    {teksterOpplysning.tekstOpplysning.lenke}
                </a>
            </p>
        </div>
    );
};

export class MeldMotebehovSkjemaKomponent extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        const {
            svarMotebehov,
        } = this.props;
        svarMotebehov(values);
    }

    render() {
        const {
            motebehovSvarReducer,
            handleSubmit,
        } = this.props;
        return (
            <form
                className="svarMotebehovSkjema"
                onSubmit={handleSubmit(this.handleSubmit)}>
                <ObligatoriskeFelterInfotekst/>
                <div className="panel">
                    <Field
                        id={FELTER.harMotebehov.navn}
                        name={FELTER.harMotebehov.navn}
                        component={CheckboxSelvstendig}
                        label={FELTER.harMotebehov.svar.tekst}
                    />
                    <Field
                        id={FELTER.lege.navn}
                        name={FELTER.lege.navn}
                        component={CheckboxSelvstendig}
                        label={FELTER.lege.tekst}
                    />
                    <MotebehovSkjemaTekstomraade
                        felt={FELTER.forklaring}
                    />
                    <MotebehovSkjemaKnapper sender={motebehovSvarReducer.sender} />
                </div>
                <TekstOpplysning />
            </form>
        );
    }
}

MeldMotebehovSkjemaKomponent.propTypes = {
    handleSubmit: PropTypes.func,
    motebehovSvarReducer: motebehovSvarReducerPt,
    svarMotebehov: PropTypes.func,
};

const validate = (values) => {
    const feilmeldinger = {};

    if (!values.harMotebehov) {
        feilmeldinger.harMotebehov = 'Velg alternativ';
    }
    const isForklaringPresent = values.forklaring && values.forklaring.trim().length > 0;
    if (isForklaringPresent && values.forklaring.match(tekstfeltRegex)) {
        feilmeldinger.forklaring = 'Ugyldig spesialtegn er oppgitt';
    }
    const forklaringLengde = values.forklaring ? values.forklaring.length : 0;
    if (forklaringLengde > MAX_LENGTH) {
        feilmeldinger.forklaring = `Maks ${MAX_LENGTH} tegn tillatt`;
    }
    return feilmeldinger;
};

const MeldMotebehovSkjema = reduxForm({
    form: SVAR_MOTEBEHOV_SKJEMANAVN,
    validate,
})(MeldMotebehovSkjemaKomponent);

const Skjema = connect()(MeldMotebehovSkjema);

export default Skjema;
