import React from 'react';
import PropTypes from 'prop-types';
import Sidetopp from '../Sidetopp';
import DialogmoterInnholdLenke from './DialogmoterInnholdLenke';
import DialogmoteVideo from './DialogmoteVideo';
import MotebehovInnholdLenke from './MotebehovInnholdLenke';

const texts = {
    title: 'Dialogmøter',
};

const DialogmoterInnhold = (
    {
        harMote,
        skalViseKvittering,
        skalViseMotebehov,
    },
) => {
    return (
        <div className="dialogmoterInnhold">
            <Sidetopp tittel={texts.title} />

            { skalViseMotebehov
        && (
            <MotebehovInnholdLenke
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
    skalViseKvittering: PropTypes.bool,
    skalViseMotebehov: PropTypes.bool,
};

export default DialogmoterInnhold;
