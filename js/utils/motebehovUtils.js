import { FELTER as MELDMOTEBEHOV_FELTER } from '../components/moter/motebehov/meldbehov/MeldMotebehovSkjema';

const isDefined = (value) => {
  return value !== undefined;
};

export const MOTEBEHOV_SKJEMATYPE = {
  MELD_BEHOV: 'MELD_BEHOV',
  SVAR_BEHOV: 'SVAR_BEHOV',
};

export const input2RSLagreMotebehov = (motebehov) => {
  const rsMotebehovSvar = {};
  if (!isDefined(motebehov)) {
    return rsMotebehovSvar;
  }
  if (isDefined(motebehov.harMotebehov)) {
    if (motebehov.harMotebehov === 'true') {
      rsMotebehovSvar.harMotebehov = true;
    } else if (motebehov.harMotebehov === 'false') {
      rsMotebehovSvar.harMotebehov = false;
    } else {
      rsMotebehovSvar.harMotebehov = motebehov.harMotebehov;
    }
  }
  if (isDefined(motebehov.forklaring) && isDefined(motebehov.lege)) {
    const separator = ' ';
    rsMotebehovSvar.forklaring = `${MELDMOTEBEHOV_FELTER.lege.tekst}${separator}${motebehov.forklaring.trim()}`;
  } else if (isDefined(motebehov.forklaring)) {
    rsMotebehovSvar.forklaring = motebehov.forklaring.trim();
  } else if (isDefined(motebehov.lege)) {
    rsMotebehovSvar.forklaring = MELDMOTEBEHOV_FELTER.lege.tekst;
  }
  return rsMotebehovSvar;
};

export const erMotebehovTilgjengelig = (motebehovReducer) => {
  if (motebehovReducer && motebehovReducer.hentingForbudt === true) {
    return false;
  }
  return (
    motebehovReducer &&
    motebehovReducer.data &&
    motebehovReducer.data.visMotebehov &&
    (motebehovReducer.data.skjemaType === MOTEBEHOV_SKJEMATYPE.MELD_BEHOV ||
      motebehovReducer.data.skjemaType === MOTEBEHOV_SKJEMATYPE.SVAR_BEHOV)
  );
};

export const isMeldBehov = (motebehovReducer) => {
  return motebehovReducer.data && motebehovReducer.data.skjemaType === MOTEBEHOV_SKJEMATYPE.MELD_BEHOV;
};

export const isSvarBehov = (motebehovReducer) => {
  return motebehovReducer.data && motebehovReducer.data.skjemaType === MOTEBEHOV_SKJEMATYPE.SVAR_BEHOV;
};

export const skalViseMotebehovKvittering = (motebehovReducer) => {
  const skalVise = erMotebehovTilgjengelig(motebehovReducer);
  if (skalVise) {
    return !!motebehovReducer.data.motebehov;
  }
  return false;
};
