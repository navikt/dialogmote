import { combineReducers } from 'redux';
import {
    BRUKER_ER_INNLOGGET,
    BRUKER_ER_UTLOGGET,
    SJEKK_INNLOGGING_FEILET,
    SJEKKER_INNLOGGING,
} from './brukerinfo_actions';

function innlogging(
    state = {
        erInnlogget: true,
        henter: false,
        hentingFeilet: false,
    },
    action = {},
) {
    switch (action.type) {
        case BRUKER_ER_UTLOGGET: {
            return {
                erInnlogget: false,
                henter: false,
                hentingFeilet: false,
            };
        }
        case BRUKER_ER_INNLOGGET: {
            return {
                ...state,
                erInnlogget: true,
                henter: false,
                hentingFeilet: false,
            };
        }
        case SJEKKER_INNLOGGING: {
            return {
                ...state,
                henter: true,
                hentingFeilet: false,
            };
        }
        case SJEKK_INNLOGGING_FEILET: {
            return {
                erInnlogget: false,
                hentingFeilet: true,
                henter: false,
            };
        }
        default: {
            return state;
        }
    }
}

const brukerinfo = combineReducers({
    innlogging,
});

export default brukerinfo;
