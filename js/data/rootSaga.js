import { all } from 'redux-saga/effects';
import brukerinfoSagas from './brukerinfo/brukerinfoSagas';
import moteSagas from './moter/moteSagas';
import motebehovSagas from './motebehov/motebehovSagas';
import svarSagas from './svar/svarSagas';

export default function* rootSaga() {
  yield all([brukerinfoSagas(), moteSagas(), motebehovSagas(), svarSagas()]);
}
