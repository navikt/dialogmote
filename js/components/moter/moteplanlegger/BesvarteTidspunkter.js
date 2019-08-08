import React from 'react';
import PropTypes from 'prop-types';
import { BRUKER, ARBEIDSGIVER, NAV_VEILEDER } from '../../../enums/moteplanleggerDeltakerTyper';
import {
    motePt,
    moteplanleggerAlternativPt,
    moteplanleggerDeltakertypePt,
} from '../../../propTypes';
import { SvarMedIkon, NavKan } from './SvarMedIkon';
import DatoOgTid from './DatoOgTid';
import { getSvar, MULIGE_SVAR } from '../../../utils/moteUtils';

const { PASSER } = MULIGE_SVAR;

const BesvarteTidspunkter = (
    {
        mote,
        alternativer,
        deltakertype = BRUKER,
    },
) => {
    const arbeidsgiver = mote.deltakere.filter((d) => {
        return d.type === ARBEIDSGIVER;
    })[0];
    const bruker = mote.deltakere.filter((d) => {
        return d.type === BRUKER;
    })[0];

    let forsteDeltaker = bruker;
    let andreDeltaker = arbeidsgiver;

    if (deltakertype === ARBEIDSGIVER) {
        forsteDeltaker = arbeidsgiver;
        andreDeltaker = bruker;
    }

    return (
        <ol className="motetidspunkter motetidspunkter--besvarteTidspunkter">
            {
                alternativer
                    .sort((a, b) => {
                        if (a.tid > b.tid) {
                            return 1;
                        }
                        if (a.tid < b.tid) {
                            return -1;
                        }
                        return 0;
                    })
                    .map((field, index) => {
                        const forsteDeltakersSvar = forsteDeltaker && forsteDeltaker.svar.filter((s) => {
                            return s.id === field.id;
                        })[0];
                        const andreDeltakersSvar = andreDeltaker && andreDeltaker.svar.filter((s) => {
                            return s.id === field.id;
                        })[0];
                        const _forsteDeltaker = forsteDeltaker && Object.assign({}, forsteDeltaker, {
                            navn: deltakertype === NAV_VEILEDER
                                ? forsteDeltaker.navn
                                : 'Du',
                        });

                        let className = 'motetidspunkt--besvart';
                        if ((!_forsteDeltaker || getSvar(forsteDeltakersSvar, _forsteDeltaker.svartidspunkt) === PASSER)
                        && (!andreDeltaker || getSvar(andreDeltakersSvar, andreDeltaker.svartidspunkt) === PASSER)) {
                            className = 'gronnRammeTidspunkt';
                        }

                        return (
                            <li className={`js-alternativ motetidspunkt ${className}`} key={index}>
                                <DatoOgTid tid={field.tid} />
                                <ul className="alternativsvar">
                                    { forsteDeltaker
                            && (
                                <SvarMedIkon
                                    bruker={_forsteDeltaker}
                                    svar={forsteDeltakersSvar}
                                />
                            )
                                    }
                                    { andreDeltaker
                            && (
                                <SvarMedIkon
                                    bruker={andreDeltaker}
                                    svar={andreDeltakersSvar}
                                />
                            ) }
                                    { deltakertype !== NAV_VEILEDER && <NavKan /> }
                                </ul>
                            </li>
                        );
                    })
            }
        </ol>
    );
};

BesvarteTidspunkter.propTypes = {
    mote: motePt,
    alternativer: PropTypes.arrayOf(moteplanleggerAlternativPt),
    deltakertype: moteplanleggerDeltakertypePt,
};

export default BesvarteTidspunkter;
