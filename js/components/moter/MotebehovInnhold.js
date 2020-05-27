import React from 'react';
import PropTypes from 'prop-types';
import {
    motebehovReducerPt,
    motebehovSvarReducerPt,
} from '../../propTypes';
import Sidetopp from '../Sidetopp';
import MotebehovSvar from './motebehov/svarmotebehov/MotebehovSvar';
import MotebehovKvittering from './motebehov/svarmotebehov/MotebehovKvittering';

const texts = {
    title: 'Behov for dialogmøte',
};

const MotebehovInnhold = (
    {
        actions,
        motebehovReducer,
        motebehovSvarReducer,
    },
) => {
    const motebehov = motebehovReducer.data && motebehovReducer.data.motebehov;

    const innhold = motebehov
        ? (
            <MotebehovKvittering
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
            <Sidetopp tittel={texts.title} />

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
