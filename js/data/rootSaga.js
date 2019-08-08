import { all } from 'redux-saga/effects';
import { ledeteksterSagas } from '@navikt/digisyfo-npm';
import brukerinfoSagas from './brukerinfo/brukerinfoSagas';
import dineSykmeldingerSagas from '../sykmeldinger/data/dine-sykmeldinger/dineSykmeldingerSagas';
import ledereSagas from '../landingsside/data/ledere/ledereSagas';
import moteSagas from './moter/moteSagas';
import motebehovSagas from './motebehov/motebehovSagas';
import svarSagas from './svar/svarSagas';
import oppfolgingsforlopsPerioderSagas from './oppfolgingsforlopsperioder/oppfolgingsforlopsPerioderSagas';
import unleashTogglesSagas from './unleash-toggles/unleashTogglesSagas';

export default function* rootSaga() {
    yield all([
        brukerinfoSagas(),
        dineSykmeldingerSagas(),
        ledeteksterSagas(),
        ledereSagas(),
        moteSagas(),
        motebehovSagas(),
        svarSagas(),
        oppfolgingsforlopsPerioderSagas(),
        unleashTogglesSagas(),
    ]);
}
