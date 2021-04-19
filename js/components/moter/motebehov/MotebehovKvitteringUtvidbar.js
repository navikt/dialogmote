import React from 'react';
import PropTypes from 'prop-types';
import { Utvidbar } from '@navikt/digisyfo-npm';
import { motebehovReducerPt } from '../../../propTypes';
import { FELTER as SVAR_MOTEBEHOV_FELTER } from './svarmotebehov/SvarMotebehovSkjema';
import { FELTER as MELDMOTEBEHOV_FELTER } from './meldbehov/MeldMotebehovSkjema';
import { tilLesbarDatoMedArstallOgUkedag } from '../../../utils/datoUtils';

const tekster = {
  motebehovKvitteringUtvidbar: {
    tittel: 'Se svaret ditt',
  },
};

const getHarBehovKvittering = (harBehovSvar, harBehovSporsmal) => {
  return harBehovSporsmal
    ? [
        <h5 className="skjemaelement__sporsmal" key={0}>
          {SVAR_MOTEBEHOV_FELTER.harMotebehov.spoersmaal}
        </h5>,
        <p key={1}>{harBehovSvar}</p>,
      ]
    : [<p key={1}>{harBehovSvar}</p>];
};

const KvitteringForklaring = (forklaring) => {
  const isLegeRequestPresent = forklaring.includes(MELDMOTEBEHOV_FELTER.lege.tekst);
  const label = <h5 className="skjemaelement__sporsmal">{SVAR_MOTEBEHOV_FELTER.forklaring.spoersmaal}</h5>;
  if (isLegeRequestPresent) {
    return (
      <React.Fragment>
        <p>{MELDMOTEBEHOV_FELTER.lege.tekst}</p>
        {label}
        <p>{forklaring.replace(MELDMOTEBEHOV_FELTER.lege.tekst, '').trim()}</p>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {label}
      <p>{forklaring}</p>
    </React.Fragment>
  );
};

const MotebehovKvitteringUtvidbar = ({ motebehovReducer, harBehovSporsmal, harBehovSvar }) => {
  const { motebehov } = motebehovReducer.data;
  const { motebehovSvar } = motebehov;
  return (
    <Utvidbar className="motebehovKvitteringUtvidbar" tittel={tekster.motebehovKvitteringUtvidbar.tittel}>
      <div>
        {motebehov.opprettetDato && <h4>{tilLesbarDatoMedArstallOgUkedag(motebehov.opprettetDato)}</h4>}
        {motebehovSvar.harMotebehov !== undefined && getHarBehovKvittering(harBehovSvar, harBehovSporsmal)}
        {motebehovSvar.forklaring && KvitteringForklaring(motebehovSvar.forklaring)}
      </div>
    </Utvidbar>
  );
};
MotebehovKvitteringUtvidbar.propTypes = {
  motebehovReducer: motebehovReducerPt,
  harBehovSporsmal: PropTypes.string,
  harBehovSvar: PropTypes.string,
};

export default MotebehovKvitteringUtvidbar;
