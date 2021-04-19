import React from 'react';
import PropTypes from 'prop-types';
import { motebehovSvarReducerPt } from '../../../../propTypes';
import SvarMotebehovSkjema from './SvarMotebehovSkjema';
import MotebehovInfoForSvar from './MotebehovInfoForSvar';
import FolketrygdlovenTekst from './FolketrygdlovenTekst';

const MotebehovSvar = ({ motebehovSvarReducer, svarMotebehov }) => {
  return (
    <div className="motebehovSvar">
      <FolketrygdlovenTekst />

      <MotebehovInfoForSvar />

      <SvarMotebehovSkjema motebehovSvarReducer={motebehovSvarReducer} svarMotebehov={svarMotebehov} />
    </div>
  );
};
MotebehovSvar.propTypes = {
  motebehovSvarReducer: motebehovSvarReducerPt,
  svarMotebehov: PropTypes.func,
};

export default MotebehovSvar;
