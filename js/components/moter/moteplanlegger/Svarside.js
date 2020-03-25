import React from 'react';
import Alertstripe from 'nav-frontend-alertstriper';
import Svarskjema from './Svarskjema';
import { motePt } from '../../../propTypes';
import { BRUKER } from '../../../enums/moteplanleggerDeltakerTyper';
import {
    BEKREFTET,
    finnNyesteAlternativ,
} from '../../../utils/moteUtils';
import { visKortDato } from '../../../utils/datoUtils';
import KoronaInfoboks, { MOTEPLANLEGGER } from '../../../sider/KoronaInfoboks';

const texts = {
    title: 'Tidspunkt for dialogmøte',
    info: 'Du har blitt tilsendt nye tidspunkter for dialogmøte',
};

const getTextConfirmation = (mote) => {
    const dateBekreftet = visKortDato(finnNyesteAlternativ(mote.alternativer).created);
    return `Sendt: ${dateBekreftet}`;
};

const Svarside = (props) => {
    const {
        mote,
    } = props;

    return (
        <div>
            <KoronaInfoboks type={MOTEPLANLEGGER} />
            <header className="sidetopp">
                <h1 className="sidetopp__tittel">{texts.title}</h1>
            </header>
            {mote.status === BEKREFTET && (
                <div className="blokk panel">
                    <Alertstripe
                        type="info"
                        className="panel">
                        <p className="uthevet">{texts.info}</p>
                        <span>
                            {getTextConfirmation(mote)}
                        </span>
                    </Alertstripe>
                </div>
            )}
            <Svarskjema
                {...props}
                deltakertype={BRUKER}
            />
        </div>
    );
};

Svarside.propTypes = {
    mote: motePt,
};

export default Svarside;
