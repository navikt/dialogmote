import { Feiloppsummering } from 'nav-frontend-skjema';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, formValueSelector, reduxForm, SubmissionError } from 'redux-form';
import Alertstripe from 'nav-frontend-alertstriper';
import { motebehovSvarReducerPt } from '@/propTypes';
import Tekstomraade from '../../../skjema/Tekstomraade';
import Radioknapper from '../../../skjema/Radioknapper';
import MotebehovSkjemaKnapper from '../MotebehovSkjemaKnapper';
import ObligatoriskeFelterInfotekst from '../ObligatoriskeFelterInfotekst';
import { eventNames } from '@/amplitude/events';
import { LANDING_URL } from '@/MVP/globals/paths';

export const tekstfeltRegex = new RegExp('.*<[^ ][^>]+[^ ]>.*');

const SVAR_MOTEBEHOV_SKJEMANAVN = 'svarMotebehov';
const MAX_LENGTH = 1000;
/* eslint-disable max-len */
export const TEKSTER_INFORMASJON = {
  sensitiv: 'Ikke skriv sensitiv informasjon, for eksempel detaljerte opplysninger om helsen din.',
  svarNeiAlert:
    'Selv om du svarer nei, kan det hende vi likevel kommer til at det er nødvendig med et møte. Svaret ditt brukes når vi vurderer behovet.',
};
/* eslint-enable max-len */

export const FELTER = {
  harMotebehov: {
    navn: 'harMotebehov',
    id: 'harMotebehov-input',
    spoersmaal: 'Har dere behov for et møte med NAV?',
    svar: [
      {
        tekst: 'Ja, jeg mener det er behov for et møte',
        verdi: true,
      },
      {
        tekst: 'Nei, jeg mener det ikke er behov for et møte',
        verdi: false,
      },
    ],
  },
  forklaring: {
    navn: 'forklaring',
    id: 'forklaring-input',
    spoersmaal: 'Begrunnelse',
  },
};

export const VilHaMoteSvarKnapper = ({ felt, isFormSubmitted, validateHarMoteBehov }) => {
  return (
    <div className="skjemaelement">
      <h3 className="skjemaelement__sporsmal" id={felt.navn}>
        {felt.spoersmaal}
      </h3>
      <Field
        id={felt.id}
        name={felt.navn}
        component={Radioknapper}
        validate={isFormSubmitted ? validateHarMoteBehov : undefined}
      >
        {felt.svar.map((svar, index) => {
          return (
            <input
              key={`vilHaMote-${index}`}
              value={svar.verdi}
              label={svar.tekst}
              id={`${felt.navn}-${index}`}
              aria-labelledby={felt.navn}
            />
          );
        })}
      </Field>
    </div>
  );
};

VilHaMoteSvarKnapper.propTypes = {
  felt: PropTypes.object,
  isFormSubmitted: PropTypes.bool,
  validateHarMoteBehov: PropTypes.func,
};

export const MotebehovSkjemaTekstomraade = ({ felt, harMotebehov, isFormSubmitted, validateForklaring }) => {
  const sporsmaalTekst = harMotebehov === 'true' ? `${felt.spoersmaal} (valgfri)` : felt.spoersmaal;
  return (
    <div className="skjema_element motebehovSkjemaTekstomraade">
      <h3 className="skjemaelement__sporsmal" id={felt.navn}>
        {sporsmaalTekst}
      </h3>
      <TekstSensitiv />
      <Field
        className="input--fullbredde"
        name={felt.navn}
        id={`${felt.id}`}
        aria-labelledby={felt.navn}
        component={Tekstomraade}
        maxLength={MAX_LENGTH}
        placeholder="Skriv her"
        rows="5"
        validate={isFormSubmitted && harMotebehov === 'false' ? validateForklaring : undefined}
      />
    </div>
  );
};
MotebehovSkjemaTekstomraade.propTypes = {
  felt: PropTypes.object,
  harMotebehov: PropTypes.string,
  isFormSubmitted: PropTypes.bool,
  validateForklaring: PropTypes.func,
};

export const TekstSensitiv = () => {
  return <p className="svarMotebehovSkjema__tekstSensitiv">{TEKSTER_INFORMASJON.sensitiv}</p>;
};

export const TekstOpplysning = () => {
  const TEKSTER = {
    tekstOpplysning: {
      tekst: 'Vi bruker opplysningene også til å gjøre selve tjeneste bedre. ',
      lenke: 'Les mer om hvordan NAV behandler personopplysninger.',
    },
  };
  return (
    <div className="svarMotebehovSkjema__tekstOpplysning">
      <p>
        {TEKSTER.tekstOpplysning.tekst}
        <br />
        <a className="lenke" href="http://www.nav.no/personvern" title="Følg lenke">
          {TEKSTER.tekstOpplysning.lenke}
        </a>
      </p>
    </div>
  );
};

export const AlertstripeNei = () => {
  return (
    <Alertstripe className="alertstripeNei" type="info">
      {TEKSTER_INFORMASJON.svarNeiAlert}
    </Alertstripe>
  );
};

export class SvarMotebehovSkjemaKomponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorList: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { harMotebehov, forklaring } = nextProps;
    const { harMotebehov: harMotebehovProp } = this.props;
    const { isFormSubmitted } = this.state;

    if (harMotebehov && harMotebehov !== harMotebehovProp && isFormSubmitted) {
      if (harMotebehov === 'false') {
        this.validateHarMoteBehov(harMotebehov);
        this.validateForklaring(forklaring);
      } else if (harMotebehov === 'true') {
        this.validateHarMoteBehov(harMotebehov);
        this.validateForklaring(forklaring);
        this.removeError(FELTER.forklaring.id);
      }
    }
  }

  removeError = (id) => {
    const { errorList } = this.state;

    const i = errorList.findIndex((e) => {
      return e.skjemaelementId === id;
    });

    if (i !== -1) {
      errorList.splice(i, 1);
    }

    this.setState({
      errorList,
    });
  };

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
    this.state.harMotebehov = value;
    this.updateFeilOppsummeringState(feilmelding, FELTER.harMotebehov.id);
    return feilmelding;
  };

  validateForklaring = (value) => {
    const { harMotebehov } = this.state;
    let feilmelding;
    if (harMotebehov === 'false') {
      if (!value || value.trim().length === 0) {
        feilmelding = 'Fyll inn tekst';
      } else if (value.match(tekstfeltRegex)) {
        feilmelding = 'Ugyldig spesialtegn er oppgitt';
      }
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
    const { harMotebehov, motebehovSvarReducer, handleSubmit } = this.props;
    const { isFormSubmitted, errorList } = this.state;
    return (
      <form className="svarMotebehovSkjema" onSubmit={handleSubmit(this.handleSubmit)}>
        <ObligatoriskeFelterInfotekst />
        <div className="panel">
          <VilHaMoteSvarKnapper
            felt={FELTER.harMotebehov}
            handleOptionChange={this.setHarBehovSvar}
            validate={isFormSubmitted ? this.validateHarMoteBehov : undefined}
          />
          {harMotebehov === 'false' && <AlertstripeNei />}
          <MotebehovSkjemaTekstomraade
            felt={FELTER.forklaring}
            harMotebehov={harMotebehov}
            isFormSubmitted={isFormSubmitted}
            validateForklaring={this.validateForklaring}
          />
          {errorList.length > 0 && (
            <Feiloppsummering tittel="For å gå videre må du rette opp følgende:" feil={errorList} />
          )}
          <MotebehovSkjemaKnapper
            sender={motebehovSvarReducer.sender}
            trackingName={eventNames.sendSvarBehov}
            cancelLinkTo={LANDING_URL}
          />
        </div>

        <TekstOpplysning />
      </form>
    );
  }
}

SvarMotebehovSkjemaKomponent.propTypes = {
  harMotebehov: PropTypes.string,
  handleSubmit: PropTypes.func,
  motebehovSvarReducer: motebehovSvarReducerPt,
  svarMotebehov: PropTypes.func,
  forklaring: PropTypes.string,
};

const valueSelector = formValueSelector(SVAR_MOTEBEHOV_SKJEMANAVN);

const mapStateToProps = (state) => {
  return {
    harMotebehov: valueSelector(state, 'harMotebehov'),
    forklaring: valueSelector(state, 'forklaring'),
  };
};

const SvarMotebehovSkjema = reduxForm({
  form: SVAR_MOTEBEHOV_SKJEMANAVN,
})(SvarMotebehovSkjemaKomponent);

const Skjema = connect(mapStateToProps)(SvarMotebehovSkjema);

export default Skjema;
