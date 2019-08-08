import { parseSykmelding } from '@navikt/digisyfo-npm';
import { BRUKER_ER_UTLOGGET } from '../../../data/brukerinfo/brukerinfo_actions';
import {
    HENT_DINE_SYKMELDINGER_FEILET,
    HENTER_DINE_SYKMELDINGER,
    SET_DINE_SYKMELDINGER,
} from './dineSykmeldingerActions';

const initiellState = {
    henter: false,
    hentingFeilet: false,
    hentet: false,
    data: [],
};

const dineSykmeldinger = (state = initiellState, action = {}) => {
    switch (action.type) {
        case SET_DINE_SYKMELDINGER: {
            if (!state.data || state.data.length === 0) {
                return {
                    data: action.sykmeldinger.map((s) => {
                        return parseSykmelding(s);
                    }),
                    henter: false,
                    hentingFeilet: false,
                    hentet: true,
                };
            }
            return {
                data: state.data.map((gammelSykmelding) => {
                    const nySykmelding = action.sykmeldinger.filter((sykmld) => {
                        return sykmld.id === gammelSykmelding.id;
                    })[0];
                    return {
                        ...gammelSykmelding,
                        ...parseSykmelding(nySykmelding),
                    };
                }),
                henter: false,
                hentingFeilet: false,
                hentet: true,
            };
        }
        case HENTER_DINE_SYKMELDINGER: {
            return {
                data: state.data,
                henter: true,
                hentingFeilet: false,
                hentet: false,
            };
        }
        case HENT_DINE_SYKMELDINGER_FEILET: {
            return {
                data: [],
                henter: false,
                hentingFeilet: true,
                hentet: true,
            };
        }
        case BRUKER_ER_UTLOGGET: {
            return {
                data: [],
                hentingFeilet: false,
                henter: false,
            };
        }
        default: {
            return state;
        }
    }
};

export default dineSykmeldinger;
