import {
    HENTER_LEDERE,
    LEDERE_HENTET,
    HENT_LEDERE_FEILET,
} from './ledereActions';

const defaultState = {
    data: [],
};

const ledere = (state = defaultState, action = {}) => {
    switch (action.type) {
        case HENTER_LEDERE: {
            return {
                henter: true,
                hentingFeilet: false,
                data: [],
                hentet: false,
            };
        }
        case LEDERE_HENTET: {
            return {
                data: action.data,
                henter: false,
                hentingFeilet: false,
                hentet: true,
            };
        }
        case HENT_LEDERE_FEILET: {
            return {
                henter: false,
                hentingFeilet: true,
                data: [],
                hentet: true,
            };
        }
        default: {
            return state;
        }
    }
};

export default ledere;
