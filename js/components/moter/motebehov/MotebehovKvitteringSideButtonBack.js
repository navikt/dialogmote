import React from 'react';
import { Link } from 'react-router';

const MotebehovKvitteringSideButtonBack = () => {
    return (
        <div className="knapperad">
            <Link className="lenke" to="/dialogmote">
                Tilbake
            </Link>
        </div>
    );
};

export default MotebehovKvitteringSideButtonBack;
