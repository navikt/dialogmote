import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, formValueSelector, reduxForm, SubmissionError } from 'redux-form';
import { Feiloppsummering } from 'nav-frontend-skjema';
import { motebehovSvarReducerPt } from '@/propTypes';
import Tekstomraade from '../../../skjema/Tekstomraade';
import CheckboxSelvstendig from '../../../skjema/CheckboxSelvstendig';
import MotebehovSkjemaKnapper from '../MotebehovSkjemaKnapper';
import ObligatoriskeFelterInfotekst from '../ObligatoriskeFelterInfotekst';
import { eventNames } from '@/amplitude/events';
import { LANDING_URL_AVBRUTT_MELD_BEHOV } from '@/MVP/globals/paths';

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
    id: 'harMotebehov-input',
    svar: {
      tekst: 'Jeg har behov for et møte med NAV',
      verdi: true,
    },
  },
  lege: {
    navn: 'lege',
    id: 'lege-input',
    tekst: 'Jeg ønsker at den som sykmelder meg, også skal delta i møtet (valgfri).',
  },
  forklaring: {
    navn: 'forklaring',
    id: 'forklaring-input',
    spoersmaal: 'Begrunnelse',
  },
};

export const MotebehovSkjemaTekstomraade = ({ felt, isFormSubmitted, validateForklaring }) => {
  const sporsmaalTekst = `${felt.spoersmaal} (valgfri)`;
  return (
    <div className="skjema_element motebehovSkjemaTekstomraade">
      <label className="skjemaelement__sporsmal" id={felt.navn} htmlFor={`${felt.id}`}>
        {sporsmaalTekst}
      </label>
      <TekstSensitiv />
      <Field
        className="input--fullbredde"
        name={felt.navn}
        id={`${felt.id}`}
        aria-labelledby={felt.navn}
        maxLength={MAX_LENGTH}
        component={Tekstomraade}
        placeholder="Skriv her"
        rows="5"
        validate={isFormSubmitted ? validateForklaring : undefined}
      />
    </div>
  );
};
MotebehovSkjemaTekstomraade.propTypes = {
  felt: PropTypes.object,
  isFormSubmitted: PropTypes.bool,
  validateForklaring: PropTypes.func,
};

export const TekstSensitiv = () => {
  return <div className="svarMotebehovSkjema__tekstSensitiv">{tekster.sensitiv}</div>;
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
        <br />
        <a className="lenke" href="http://www.nav.no/personvern" title="Følg lenke">
          {teksterOpplysning.tekstOpplysning.lenke}
        </a>
      </p>
    </div>
  );
};

export class MeldMotebehovSkjemaKomponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorList: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateFeilOppsummeringState = (feilmelding, elementId) => {
    const { errorList } = this.state;
    const i = errorList.findIndex((obj) => obj.skjemaelementId === elementId);

    if (i > -1 && feilmelding === undefined) {
      errorList.splice(i, 1);
      this.setState({
        errorList,
      });
    } else if (i === -1 && feilmelding !== undefined) {
      errorList.push({ skjemaelementId: elementId, feilmelding });
    }
  };

  validateHarMoteBehov = (value) => {
    let feilmelding;
    if (!value) {
      feilmelding = 'Velg alternativ';
    }
    this.updateFeilOppsummeringState(feilmelding, FELTER.harMotebehov.id);
    return feilmelding;
  };

  validateForklaring = (value) => {
    let feilmelding;
    const isForklaringPresent = value && value.trim().length > 0;
    if (isForklaringPresent && value.match(tekstfeltRegex)) {
      feilmelding = 'Ugyldig spesialtegn er oppgitt';
    }

    const forklaringLengde = value ? value.length : 0;
    if (forklaringLengde > MAX_LENGTH) {
      feilmelding = `Maks ${MAX_LENGTH} tegn tillatt`;
    }
    this.updateFeilOppsummeringState(feilmelding, FELTER.forklaring.id);
    return feilmelding;
  };

  validateAllFields = (values) => {
    return {
      harMotebehov: this.validateHarMoteBehov(values.harMotebehov),
      forklaring: this.validateForklaring(values.forklaring),
    };
  };

  handleSubmit(values) {
    const { svarMotebehov } = this.props;

    const errorObject = {
      harMotebehov: '',
      forklaring: '',
      _error: 'Validering av skjema feilet',
    };

    this.setState({
      isFormSubmitted: true,
    });

    const errorList = [];
    const feilmeldingerObject = this.validateAllFields(values);

    if (feilmeldingerObject.harMotebehov) {
      errorObject.harMotebehov = feilmeldingerObject.harMotebehov;
      errorList.push({ skjemaelementId: FELTER.harMotebehov.id, feilmelding: feilmeldingerObject.harMotebehov });
    }

    if (feilmeldingerObject.forklaring) {
      errorObject.forklaring = feilmeldingerObject.forklaring;
      errorList.push({ skjemaelementId: FELTER.forklaring.id, feilmelding: feilmeldingerObject.forklaring });
    }

    if (feilmeldingerObject.harMotebehov || feilmeldingerObject.forklaring) {
      this.setState({
        errorList,
      });

      throw new SubmissionError(errorObject);
    }

    this.setState({
      errorList: [],
    });
    svarMotebehov(values);
  }

  render() {
    const { motebehovSvarReducer, handleSubmit } = this.props;
    const { isFormSubmitted, errorList } = this.state;

    return (
      <form className="svarMotebehovSkjema" onSubmit={handleSubmit(this.handleSubmit)}>
        <ObligatoriskeFelterInfotekst />
        <div className="panel">
          <div className="skjema__checkbox-container">
            <Field
              id={FELTER.harMotebehov.id}
              name={FELTER.harMotebehov.navn}
              component={CheckboxSelvstendig}
              label={FELTER.harMotebehov.svar.tekst}
              validate={isFormSubmitted ? this.validateHarMoteBehov : undefined}
            />
          </div>
          <div className="skjema__checkbox-container">
            <Field
              id={FELTER.lege.id}
              name={FELTER.lege.navn}
              component={CheckboxSelvstendig}
              label={FELTER.lege.tekst}
            />
          </div>
          <MotebehovSkjemaTekstomraade
            felt={FELTER.forklaring}
            isFormSubmitted={isFormSubmitted}
            validateForklaring={this.validateForklaring}
          />

          {errorList.length > 0 && (
            <Feiloppsummering tittel="For å gå videre må du rette opp følgende:" feil={errorList} />
          )}
          <MotebehovSkjemaKnapper
            sender={motebehovSvarReducer.sender}
            trackingName={eventNames.sendMeldBehov}
            cancelLinkTo={LANDING_URL_AVBRUTT_MELD_BEHOV}
          />
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

const valueSelector = formValueSelector(SVAR_MOTEBEHOV_SKJEMANAVN);

const mapStateToProps = (state) => {
  return {
    harMotebehov: valueSelector(state, 'harMotebehov'),
    forklaring: valueSelector(state, 'forklaring'),
  };
};

const MeldMotebehovSkjema = reduxForm({
  form: SVAR_MOTEBEHOV_SKJEMANAVN,
})(MeldMotebehovSkjemaKomponent);

const Skjema = connect(mapStateToProps)(MeldMotebehovSkjema);

export default Skjema;
