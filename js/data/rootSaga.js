import { all } from 'redux-saga/effects';
import brukerinfoSagas from './brukerinfo/brukerinfoSagas';
import dineSykmeldingerSagas from './dine-sykmeldinger/dineSykmeldingerSagas';
import ledereSagas from './ledere/ledereSagas';
import moteSagas from './moter/moteSagas';
import motebehovSagas from './motebehov/motebehovSagas';
import svarSagas from './svar/svarSagas';
import oppfolgingsforlopsPerioderSagas from './oppfolgingsforlopsperioder/oppfolgingsforlopsPerioderSagas';

export default function* rootSaga() {
    yield all([
        brukerinfoSagas(),
        dineSykmeldingerSagas(),
        ledereSagas(),
        moteSagas(),
        motebehovSagas(),
        svarSagas(),
        oppfolgingsforlopsPerioderSagas(),
    ]);
}
