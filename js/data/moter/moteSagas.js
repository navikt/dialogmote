import { call, put, select, takeEvery } from 'redux-saga/effects';
import { log } from '@/logging/log';
import * as actions from './mote_actions';
import { skalHenteMote } from './moteSelectors';
import { get } from '@/api/axios';
import { MOTEADMIN_API } from '@/MVP/globals/paths';

export function* hentMote() {
  yield put(actions.henterMote());
  try {
    const url = `${MOTEADMIN_API}/arbeidstaker/moter/siste`;
    const mote = yield call(get, url);
    yield put(actions.moteHentet(mote));
  } catch (e) {
    if (e.code === 404) {
      yield put(actions.moteIkkeFunnet());
    } else {
      log(e);
      yield put(actions.hentMoteFeilet());
    }
  }
}

export function* hentMoteHvisIkkeHentet() {
  const skalHente = yield select(skalHenteMote);
  if (skalHente) {
    yield hentMote();
  }
}

export default function* svarSagas() {
  yield takeEvery(actions.HENT_MOTE_FORESPURT, hentMoteHvisIkkeHentet);
}
