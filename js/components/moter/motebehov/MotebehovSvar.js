import React from 'react';
import PropTypes from 'prop-types';
import { motebehovSvarReducerPt } from '../../../propTypes';
import SvarMotebehovSkjema from './SvarMotebehovSkjema';
import MotebehovInfoForSvar from './MotebehovInfoForSvar';
import FolketrygdlovenTekst from './FolketrygdlovenTekst';

const MotebehovSvar = (
    {
        virksomhetsnrListe,
        motebehovSvarReducerListe,
        svarMotebehov,
    },
) => {
    return (
        <div className="motebehovSvar">
            <FolketrygdlovenTekst />

            <MotebehovInfoForSvar />

            <SvarMotebehovSkjema
                virksomhetsnrListe={virksomhetsnrListe}
                motebehovSvarReducerListe={motebehovSvarReducerListe}
                svarMotebehov={svarMotebehov}
            />
        </div>
    );
};
MotebehovSvar.propTypes = {
    virksomhetsnrListe: PropTypes.arrayOf(PropTypes.string),
    motebehovSvarReducerListe: PropTypes.arrayOf(motebehovSvarReducerPt),
    svarMotebehov: PropTypes.func,
};

export default MotebehovSvar;
