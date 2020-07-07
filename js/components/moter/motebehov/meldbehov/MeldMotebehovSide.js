import React from 'react';
import { motebehovReducerPt } from '../../../../propTypes';
import MeldMotebehovKvittering from './MeldMotebehovKvittering';
import MotebehovKvitteringSideButtonBack from '../MotebehovKvitteringSideButtonBack';

const MeldMotebehovKvitteringSide = (
    {
        motebehovReducer,
    },
) => {
    return (
        <div>
            <MeldMotebehovKvittering
                motebehovReducer={motebehovReducer}
            />
            <MotebehovKvitteringSideButtonBack />
        </div>
    );
};
MeldMotebehovKvitteringSide.propTypes = {
    motebehovReducer: motebehovReducerPt,
};

export default MeldMotebehovKvitteringSide;
