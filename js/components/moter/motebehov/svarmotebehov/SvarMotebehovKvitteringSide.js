import React from 'react';
import { motebehovReducerPt } from '../../../../propTypes';
import SvarMotebehovKvittering from './SvarMotebehovKvittering';
import MotebehovKvitteringSideButtonBack from '../MotebehovKvitteringSideButtonBack';

const SvarMotebehovKvitteringSide = ({ motebehovReducer }) => {
  return (
    <div>
      <SvarMotebehovKvittering motebehovReducer={motebehovReducer} />
      <MotebehovKvitteringSideButtonBack />
    </div>
  );
};
SvarMotebehovKvitteringSide.propTypes = {
  motebehovReducer: motebehovReducerPt,
};

export default SvarMotebehovKvitteringSide;
