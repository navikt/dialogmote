import React from 'react';
import { motebehovPt } from '../../../../propTypes';
import SvarMotebehovKvittering from './SvarMotebehovKvittering';
import MotebehovKvitteringSideButtonBack from '../MotebehovKvitteringSideButtonBack';

const SvarMotebehovKvitteringSide = (
    {
        motebehov,
    },
) => {
    return (
        <div>
            <SvarMotebehovKvittering
                motebehov={motebehov}
            />
            <MotebehovKvitteringSideButtonBack />
        </div>
    );
};
SvarMotebehovKvitteringSide.propTypes = {
    motebehov: motebehovPt,
};

export default SvarMotebehovKvitteringSide;
