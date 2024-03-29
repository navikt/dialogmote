import React from 'react';
import PropTypes from 'prop-types';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { UndertekstBold } from 'nav-frontend-typografi';
import { motebehovReducerPt } from '@/propTypes';
import { FELTER as SVAR_MOTEBEHOV_FELTER } from './svarmotebehov/SvarMotebehovSkjema';
import { FELTER as MELDMOTEBEHOV_FELTER } from './meldbehov/MeldMotebehovSkjema';
import { tilLesbarDatoMedArstallOgUkedag } from '@/utils/datoUtils';

const tekster = {
  motebehovKvitteringUtvidbar: {
    tittel: 'Se svaret ditt',
  },
};

export const getHarBehovKvittering = (harBehovSvar, harBehovSporsmal) => {
  return harBehovSporsmal
    ? [
        <UndertekstBold key="harBehovSporsmal">{SVAR_MOTEBEHOV_FELTER.harMotebehov.spoersmaal}</UndertekstBold>,
        <p key="harBehovTekst">{harBehovSvar}</p>,
      ]
    : [<p key="harBehovSvar">{harBehovSvar}</p>];
};

export const KvitteringForklaring = (forklaring) => {
  if (!forklaring) return null;

  const legeRequestText = MELDMOTEBEHOV_FELTER.lege.tekst.replace(' (valgfri)', '').trim();
  const isLegeRequestPresent = forklaring.includes(MELDMOTEBEHOV_FELTER.lege.tekst);
  const label = <UndertekstBold>{SVAR_MOTEBEHOV_FELTER.forklaring.spoersmaal}</UndertekstBold>;
  const forklaringTekst = forklaring.replace(MELDMOTEBEHOV_FELTER.lege.tekst, '').trim();

  if (isLegeRequestPresent) {
    return (
      <React.Fragment>
        <p>{legeRequestText}</p>
        {forklaringTekst ? (
          <React.Fragment>
            {label}
            {forklaringTekst}
          </React.Fragment>
        ) : null}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {forklaring ? (
        <React.Fragment>
          {label}
          {forklaring}
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
};

const MotebehovKvitteringUtvidbar = ({ motebehovReducer, harBehovSporsmal, harBehovSvar }) => {
  const { motebehov } = motebehovReducer.data;
  const { motebehovSvar } = motebehov;
  return (
    <Ekspanderbartpanel className="motebehovKvitteringUtvidbar" tittel={tekster.motebehovKvitteringUtvidbar.tittel}>
      <div>
        {motebehov.opprettetDato && <h4>{tilLesbarDatoMedArstallOgUkedag(motebehov.opprettetDato)}</h4>}
        {motebehovSvar.harMotebehov !== undefined && getHarBehovKvittering(harBehovSvar, harBehovSporsmal)}
        {motebehovSvar.forklaring && KvitteringForklaring(motebehovSvar.forklaring)}
      </div>
    </Ekspanderbartpanel>
  );
};
MotebehovKvitteringUtvidbar.propTypes = {
  motebehovReducer: motebehovReducerPt,
  harBehovSporsmal: PropTypes.string,
  harBehovSvar: PropTypes.string,
};

export default MotebehovKvitteringUtvidbar;
