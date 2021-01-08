import React from 'react';
import PropTypes from 'prop-types';
import {
    motebehovReducerPt,
    motebehovSvarReducerPt,
} from '../../../../propTypes';
import { skalViseMotebehovKvittering } from '../../../../utils/motebehovUtils';
import MeldMotebehovSkjema from './MeldMotebehovSkjema';
import Sidetopp from '../../../Sidetopp';
import MeldMotebehovKvitteringSide from './MeldMotebehovSide';

const texts = {
    title: {
        default: 'Meld behov for møte',
        receipt: 'Kvittering for møtebehov',
    },
};

const MeldMotebehovInnhold = (
    {
        svarMotebehov,
        motebehovReducer,
        motebehovSvarReducer,
    },
) => {
    const isKvittering = skalViseMotebehovKvittering(motebehovReducer);
    const title = isKvittering
        ? texts.title.receipt
        : texts.title.default;
    const content = isKvittering
        ? (
            <MeldMotebehovKvitteringSide
                motebehovReducer={motebehovReducer}
            />
        )
        : (
            <MeldMotebehovSkjema
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
MeldMotebehovInnhold.propTypes = {
    svarMotebehov: PropTypes.func,
    motebehovReducer: motebehovReducerPt,
    motebehovSvarReducer: motebehovSvarReducerPt,
};

export default MeldMotebehovInnhold;
