import React from 'react';
import PropTypes from 'prop-types';
import {
    motebehovReducerPt,
    motebehovSvarReducerPt,
    sykeforloepPt,
} from '../../propTypes';
import Sidetopp from '../Sidetopp';
import MotebehovSvar from './motebehov/MotebehovSvar';
import MotebehovKvittering from './motebehov/MotebehovKvittering';
import {
    finnNyesteMotebehovForVirksomhetListeIOppfolgingsforlop,
} from '../../utils/motebehovUtils';
import KoronaInfoboks, { MOTEBEHOV } from '../../sider/KoronaInfoboks';

const texts = {
    title: 'Behov for dialogmøte',
};

const MotebehovInnhold = (
    {
        actions,
        motebehovReducer,
        motebehovSvarReducerListe,
        oppfolgingsforlopsPerioderReducerListe,
        virksomhetnrMedMotebehovListe,
    },
) => {
    const motebehov = finnNyesteMotebehovForVirksomhetListeIOppfolgingsforlop(motebehovReducer, virksomhetnrMedMotebehovListe, oppfolgingsforlopsPerioderReducerListe);

    const innhold = motebehov
        ? (
            <MotebehovKvittering
                motebehov={motebehov}
            />
        )
        : (
            <MotebehovSvar
                virksomhetsnrListe={virksomhetnrMedMotebehovListe}
                motebehovSvarReducerListe={motebehovSvarReducerListe}
                svarMotebehov={actions.svarMotebehov}
            />
        );
    return (
        <div className="motebehovSideInnhold">
            <KoronaInfoboks type={MOTEBEHOV} />
            <Sidetopp tittel={texts.title} />

            { innhold }
        </div>
    );
};
MotebehovInnhold.propTypes = {
    actions: PropTypes.shape({
        hentMotebehov: PropTypes.func,
        svarMotebehov: PropTypes.func,
    }),
    motebehovReducer: motebehovReducerPt,
    motebehovSvarReducerListe: PropTypes.arrayOf(motebehovSvarReducerPt),
    oppfolgingsforlopsPerioderReducerListe: PropTypes.arrayOf(sykeforloepPt),
    virksomhetnrMedMotebehovListe: PropTypes.arrayOf(PropTypes.string),
};

export default MotebehovInnhold;
