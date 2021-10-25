import React from 'react';
import { TrackedLink } from '../../buttons/TrackedLink';

const MotebehovKvitteringSideButtonBack = () => {
  return (
    <div className="knapperad">
      <TrackedLink className="lenke" to="/dialogmote">
        Tilbake
      </TrackedLink>
    </div>
  );
};

export default MotebehovKvitteringSideButtonBack;
