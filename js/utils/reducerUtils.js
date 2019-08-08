export const henterEllerHarHentetLedere = (ledere) => {
    return ledere.henter || ledere.hentet;
};

export const forsoektHentetLedere = (ledereReducer) => {
    return ledereReducer.hentet || ledereReducer.hentingFeilet;
};

export const forsoektHentetDineSykmeldinger = (dineSykmeldingerReducer) => {
    return dineSykmeldingerReducer.hentet || dineSykmeldingerReducer.hentingFeilet;
};

export const forsoktHentetMote = (moteReducer) => {
    return moteReducer.hentet || moteReducer.hentingFeilet;
};
