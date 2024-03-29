import React from 'react';
import styled from 'styled-components';
import { isMeldBehov, isSvarBehov, skalViseMotebehovKvittering } from '@/utils/motebehovUtils';
import { motebehovReducerPt } from '@/propTypes';
import { LANDING_URL } from '@/MVP/globals/paths';
import { Link } from 'react-router';

const TEKSTER = {
  tittel: 'Trenger dere et dialogmøte med NAV?',
  undertekst: 'Er det ikke behov for møte? Da trenger du ikke svare på denne.',
  knappKvittering: 'Se Kvittering',
  meldBehov: {
    knappBehov: 'Meld behov for møte',
  },
  svarBehov: {
    knappBehov: 'Vurder behov for møte',
  },
};

const MotebehovInnholdLenkeStyled = styled.div`
  text-align: center;
`;

const getTextLink = (motebehov) => {
  if (skalViseMotebehovKvittering(motebehov)) {
    return TEKSTER.knappKvittering;
  }
  if (isSvarBehov(motebehov)) {
    return TEKSTER.svarBehov.knappBehov;
  }
  return TEKSTER.meldBehov.knappBehov;
};

const MotebehovInnholdLenke = ({ motebehov }) => {
  return (
    <MotebehovInnholdLenkeStyled className="motebehovInnholdLenke panel">
      <h2 className="panel__tittel">{TEKSTER.tittel}</h2>
      {isMeldBehov(motebehov) && <p>{TEKSTER.undertekst}</p>}
      <Link className="knapp" to={`${LANDING_URL}/behov`}>
        {getTextLink(motebehov)}
      </Link>
    </MotebehovInnholdLenkeStyled>
  );
};
MotebehovInnholdLenke.propTypes = {
  motebehov: motebehovReducerPt,
};

export default MotebehovInnholdLenke;
