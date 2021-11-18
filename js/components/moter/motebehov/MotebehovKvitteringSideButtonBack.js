import React from 'react';
import { LANDING_URL } from '@/MVP/globals/paths';
import { Link } from 'react-router';

const MotebehovKvitteringSideButtonBack = () => {
  return (
    <div className="knapperad">
      <Link className="lenke" to={LANDING_URL}>
        Tilbake
      </Link>
    </div>
  );
};

export default MotebehovKvitteringSideButtonBack;
