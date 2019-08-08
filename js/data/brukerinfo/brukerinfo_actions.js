export const BRUKER_ER_INNLOGGET = 'BRUKER_ER_INNLOGGET';
export const BRUKER_ER_UTLOGGET = 'BRUKER_ER_UTLOGGET';
export const SJEKKER_INNLOGGING = 'SJEKKER_INNLOGGING';
export const SJEKK_INNLOGGING_FEILET = 'SJEKK_INNLOGGING_FEILET';
export const SJEKK_INNLOGGING_FORESPURT = 'SJEKK_INNLOGGING_FORESPURT';
export const HENTER_SYKMELDTINFODATA = 'HENTER_SYKMELDTINFODATA';
export const HENT_SYKMELDTINFODATA_FEILET = 'HENT_SYKMELDTINFODATA_FEILET';

export function setErInnlogget() {
    return {
        type: BRUKER_ER_INNLOGGET,
    };
}

export function setErUtlogget() {
    return {
        type: BRUKER_ER_UTLOGGET,
    };
}

export function sjekkerInnlogging() {
    return {
        type: SJEKKER_INNLOGGING,
    };
}

export function sjekkInnlogging() {
    return {
        type: SJEKK_INNLOGGING_FORESPURT,
    };
}

export function sjekkInnloggingFeilet() {
    return {
        type: SJEKK_INNLOGGING_FEILET,
    };
}
