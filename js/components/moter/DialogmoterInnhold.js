import React from 'react';
import PropTypes from 'prop-types';
import Sidetopp from '../Sidetopp';
import DialogmoterInnholdLenke from './DialogmoterInnholdLenke';
import DialogmoteVideo from './DialogmoteVideo';
import MotebehovInnholdLenke from './MotebehovInnholdLenke';
import { MOTEBEHOV_SKJEMATYPE, skalViseMotebehovKvittering } from '../../utils/motebehovUtils';
import SvarMotebehovKvittering from './motebehov/svarmotebehov/SvarMotebehovKvittering';
import DialogmoterInnholdVeileder from './DialogmoterInnholdVeileder';
import { motebehovReducerPt } from '../../propTypes';

const texts = {
    title: 'Dialogmøter',
};

const MotebehovInnholdKvittering = (
    {
        motebehovReducer,
        skalViseKvittering,
    },
) => {
    const isKvittering = skalViseMotebehovKvittering(motebehovReducer);
    const { skjemaType } = motebehovReducer.data;
    let content = React.Fragment;
    if (isKvittering) {
        if (skjemaType === MOTEBEHOV_SKJEMATYPE.SVAR_BEHOV) {
            content = (
                <SvarMotebehovKvittering motebehov={motebehovReducer.data.motebehov} />
            );
        }
    } else {
        content = (
            <React.Fragment>
                <DialogmoterInnholdVeileder />
                <MotebehovInnholdLenke
                    skalViseKvittering={skalViseKvittering}
                />
            </React.Fragment>
        );
    }
    return content;
};
MotebehovInnholdKvittering.propTypes = {
    motebehovReducer: motebehovReducerPt,
    skalViseMotebehov: PropTypes.bool,
};

const DialogmoterInnhold = (
    {
        harMote,
        motebehovReducer,
        skalViseKvittering,
        skalViseMotebehov,
    },
) => {
    return (
        <div className="dialogmoterInnhold">
            <Sidetopp tittel={texts.title} />

            { skalViseMotebehov
        && (
            <MotebehovInnholdKvittering
                motebehovReducer={motebehovReducer}
                skalViseKvittering={skalViseKvittering}
            />
        )
            }

            { harMote && <DialogmoterInnholdLenke /> }

            <DialogmoteVideo />
        </div>
    );
};
DialogmoterInnhold.propTypes = {
    harMote: PropTypes.bool,
    motebehovReducer: motebehovReducerPt,
    skalViseKvittering: PropTypes.bool,
    skalViseMotebehov: PropTypes.bool,
};

export default DialogmoterInnhold;
