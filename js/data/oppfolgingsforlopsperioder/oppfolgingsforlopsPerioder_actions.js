export const HENT_OPPFOLGINGSFORLOPSPERIODER_FORESPURT = 'HENT_OPPFOLGINGSFORLOPSPERIODER_FORESPURT';
export const HENT_OPPFOLGINGSFORLOPSPERIODER_HENTER = 'HENT_OPPFOLGINGSFORLOPSPERIODER_HENTER';
export const HENT_OPPFOLGINGSFORLOPSPERIODER_HENTET = 'HENT_OPPFOLGINGSFORLOPSPERIODER_HENTET';
export const HENT_OPPFOLGINGSFORLOPSPERIODER_FEILET = 'HENT_OPPFOLGINGSFORLOPSPERIODER_FEILET';

export const hentOppfolgingsforlopsPerioder = (virksomhetsnummer) => {
    return {
        type: HENT_OPPFOLGINGSFORLOPSPERIODER_FORESPURT,
        virksomhetsnummer,
    };
};

export const hentOppfolgingsforlopsPerioderHenter = (virksomhetsnummer) => {
    return {
        type: HENT_OPPFOLGINGSFORLOPSPERIODER_HENTER,
        virksomhetsnummer,
    };
};

export const hentOppfolgingsforlopsPerioderHentet = (periodeListe, virksomhetsnummer) => {
    return {
        type: HENT_OPPFOLGINGSFORLOPSPERIODER_HENTET,
        periodeListe,
        virksomhetsnummer,
    };
};

export const hentOppfolgingsforlopsPerioderFeilet = (virksomhetsnummer) => {
    return {
        type: HENT_OPPFOLGINGSFORLOPSPERIODER_FEILET,
        virksomhetsnummer,
    };
};
