import { reducer as formReducer } from 'redux-form';
import brukerinfo from './brukerinfo/brukerinfo';
import dineSykmeldinger from './dine-sykmeldinger/dineSykmeldinger';
import ledere from './ledere/ledere';
import oppfolgingsforlopsPerioder from './oppfolgingsforlopsperioder/oppfolgingsforlopsPerioder';
import mote from './moter/mote';
import svar from './svar/svar';
import motebehov from './motebehov/motebehov';
import motebehovSvar from './motebehov-svar/motebehovSvar';
import history from '../history';
import timeout from '../timeout/timeout';

const reducers = {
    brukerinfo,
    dineSykmeldinger,
    history,
    ledere,
    mote,
    motebehov,
    motebehovSvar,
    oppfolgingsforlopsPerioder,
    svar,
    timeout,
    form: formReducer,
};

export default reducers;
