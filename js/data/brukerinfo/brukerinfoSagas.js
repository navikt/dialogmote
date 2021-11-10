import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { log } from '../../logging/log';
import * as actions from './brukerinfo_actions';
import { getAjax } from '../gateway-api/apiUtils';

export function* sjekkInnlogging() {
  yield put(actions.sjekkerInnlogging());
  try {
    yield call(getAjax, `${process.env.REACT_APP_CONTEXT_ROOT}/`);
    yield put(actions.setErInnlogget());
  } catch (e) {
    log(e);
    yield put(actions.setErUtlogget());
  }
}

function* watchSjekkInnlogging() {
  yield takeEvery(actions.SJEKK_INNLOGGING_FORESPURT, sjekkInnlogging);
}

export default function* brukerinfoSagas() {
  yield all([fork(watchSjekkInnlogging)]);
}
