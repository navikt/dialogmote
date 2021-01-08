import React from 'react';
import PropTypes from 'prop-types';
import {
    motebehovReducerPt,
    motebehovSvarReducerPt,
} from '../../../../propTypes';
import { skalViseMotebehovKvittering } from '../../../../utils/motebehovUtils';
import MotebehovSvar from './MotebehovSvar';
import SvarMotebehovKvitteringSide from './SvarMotebehovKvitteringSide';
import Sidetopp from '../../../Sidetopp';

const texts = {
    title: {
        default: 'Meld behov for møte',
        receipt: 'Kvittering for møtebehov',
    },
};

const SvarMotebehovInnhold = (
    {
        svarMotebehov,
        motebehovReducer,
        motebehovSvarReducer,
    },
) => {
    const visKvittering = skalViseMotebehovKvittering(motebehovReducer);
    const title = visKvittering
        ? texts.title.receipt
        : texts.title.default;
    const content = visKvittering
        ? <SvarMotebehovKvitteringSide motebehovReducer={motebehovReducer} />
        : (
            <MotebehovSvar
                motebehovSvarReducer={motebehovSvarReducer}
                svarMotebehov={svarMotebehov}
            />
        );
    return (
        <React.Fragment>
            <Sidetopp tittel={title} />
            {content}
        </React.Fragment>
    );
};
SvarMotebehovInnhold.propTypes = {
    svarMotebehov: PropTypes.func,
    motebehovReducer: motebehovReducerPt,
    motebehovSvarReducer: motebehovSvarReducerPt,
};

export default SvarMotebehovInnhold;
