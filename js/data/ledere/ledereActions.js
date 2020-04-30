export const HENT_LEDERE_FORESPURT = 'HENT_LEDERE_FORESPURT';
export const HENTER_LEDERE = 'HENTER_LEDERE';
export const LEDERE_HENTET = 'LEDERE_HENTET';
export const HENT_LEDERE_FEILET = 'HENT_LEDERE_FEILET';

export const hentLedere = () => {
    return {
        type: HENT_LEDERE_FORESPURT,
    };
};

export const henterLedere = () => {
    return {
        type: HENTER_LEDERE,
    };
};

export const ledereHentet = (data) => {
    return {
        type: LEDERE_HENTET,
        data,
    };
};

export const hentLedereFeilet = () => {
    return {
        type: HENT_LEDERE_FEILET,
    };
};
