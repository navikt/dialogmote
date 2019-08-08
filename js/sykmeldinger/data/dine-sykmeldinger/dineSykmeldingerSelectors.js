export const selectDineSykmeldingerSlice = (state) => {
    return state.dineSykmeldinger;
};

export const selectSkalHenteDineSykmeldinger = (state) => {
    const dineSykmeldinger = selectDineSykmeldingerSlice(state);
    return !dineSykmeldinger.henter
        && !dineSykmeldinger.hentet
        && !dineSykmeldinger.hentingFeilet;
};
