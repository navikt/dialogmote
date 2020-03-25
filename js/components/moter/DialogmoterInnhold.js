import React from 'react';
import PropTypes from 'prop-types';
import Sidetopp from '../Sidetopp';
import DialogmoterInnholdLenke from './DialogmoterInnholdLenke';
import MotebehovInnholdLenke from './MotebehovInnholdLenke';
import KoronaInfoboks, { MOTEBEHOV } from '../../sider/KoronaInfoboks';

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
            <KoronaInfoboks type={MOTEBEHOV} />
            <Sidetopp tittel={texts.title} />

            { skalViseMotebehov
        && (
            <MotebehovInnholdLenke
                skalViseKvittering={skalViseKvittering}
            />
        )
            }

            { harMote && <DialogmoterInnholdLenke /> }
        </div>
    );
};
DialogmoterInnhold.propTypes = {
    harMote: PropTypes.bool,
    skalViseKvittering: PropTypes.bool,
    skalViseMotebehov: PropTypes.bool,
};

export default DialogmoterInnhold;
