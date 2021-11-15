import { all } from 'redux-saga/effects';
import moteSagas from './moter/moteSagas';
import motebehovSagas from './motebehov/motebehovSagas';
import svarSagas from './svar/svarSagas';

export default function* rootSaga() {
  yield all([moteSagas(), motebehovSagas(), svarSagas()]);
}
