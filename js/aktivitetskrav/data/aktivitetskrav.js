import { AKTIVITETSKRAV_BEKREFTET, BEKREFT_AKTIVITETSKRAV_FEILET, BEKREFTER_AKTIVITETSKRAV } from './aktivitetskravActions';

const initState = {
    bekrefter: false,
    bekreftFeilet: false,
};

const aktivitetskrav = (state = initState, action = {}) => {
    switch (action.type) {
        case BEKREFTER_AKTIVITETSKRAV: {
            return {
                bekrefter: true,
                bekreftFeilet: false,
            };
        }
        case AKTIVITETSKRAV_BEKREFTET: {
            return {
                bekrefter: false,
                bekreftFeilet: false,
            };
        }
        case BEKREFT_AKTIVITETSKRAV_FEILET: {
            return {
                bekrefter: false,
                bekreftFeilet: true,
            };
        }
        default: {
            return state;
        }
    }
};

export default aktivitetskrav;
