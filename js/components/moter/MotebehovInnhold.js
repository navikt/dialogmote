import React from 'react';
import PropTypes from 'prop-types';
import {
    motebehovReducerPt,
    motebehovSvarReducerPt,
} from '../../propTypes';
import { skalViseMotebehovKvittering } from '../../utils/motebehovUtils';
import Sidetopp from '../Sidetopp';
import MotebehovSvar from './motebehov/svarmotebehov/MotebehovSvar';
import SvarMotebehovKvittering from './motebehov/svarmotebehov/SvarMotebehovKvittering';

const texts = {
    title: {
        default: 'Behov for dialogmøte',
        receipt: 'Kvittering',
    },
};

const MotebehovInnhold = (
    {
        actions,
        motebehovReducer,
        motebehovSvarReducer,
    },
) => {
    const motebehov = motebehovReducer.data && motebehovReducer.data.motebehov;

    const isKvittering = skalViseMotebehovKvittering(motebehovReducer);
    const title = isKvittering
        ? texts.title.receipt
        : texts.title.default;
    const innhold = motebehov
        ? (
            <SvarMotebehovKvittering
                motebehov={motebehov}
            />
        )
        : (
            <MotebehovSvar
                motebehovSvarReducer={motebehovSvarReducer}
                svarMotebehov={actions.svarMotebehov}
            />
        );
    return (
        <div className="motebehovSideInnhold">
            <Sidetopp tittel={title} />

            { innhold }
        </div>
    );
};
MotebehovInnhold.propTypes = {
    actions: PropTypes.shape({
        hentMotebehov: PropTypes.func,
        svarMotebehov: PropTypes.func,
    }),
    motebehovReducer: motebehovReducerPt,
    motebehovSvarReducer: motebehovSvarReducerPt,
};

export default MotebehovInnhold;
