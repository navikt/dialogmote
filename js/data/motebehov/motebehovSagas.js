import { call, put, select, takeEvery } from 'redux-saga/effects';
import { log } from '@/logging/log';
import { get, post } from '@/api/axios';
import { API_NAVN, hentSyfoApiUrl } from '@/api/apiUtils';
import * as actions from './motebehov_actions';
import { skalHenteMotebehov } from './motebehovSelectors';
import { input2RSLagreMotebehov } from '@/utils/motebehovUtils';

export function* hentMotebehov() {
  yield put(actions.hentMotebehovHenter());
  try {
    const url = `${hentSyfoApiUrl(API_NAVN.SYFOMOTEBEHOV)}/v2/arbeidstaker/motebehov`;
    const data = yield call(get, url);
    yield put(actions.hentMotebehovHentet(data));
  } catch (e) {
    log(e);
    if (e.message === '403') {
      yield put(actions.hentMotebehovForbudt());
      return;
    }
    yield put(actions.hentMotebehovFeilet());
  }
}

export function* hentMotebehovHvisIkkeHentet() {
  const skalHente = yield select(skalHenteMotebehov);
  if (skalHente) {
    yield hentMotebehov();
  }
}

export function* svarMotebehov(action) {
  const body = input2RSLagreMotebehov(action.svar);
  yield put(actions.svarMotebehovSender());
  try {
    const url = `${hentSyfoApiUrl(API_NAVN.SYFOMOTEBEHOV)}/v2/arbeidstaker/motebehov`;
    yield call(post, url, body);
    yield put(actions.svarMotebehovSendt(body));
  } catch (e) {
    log(e);
    yield put(actions.svarMotebehovFeilet());
  }
}

export default function* motebehovSagas() {
  yield takeEvery(actions.HENT_MOTEBEHOV_FORESPURT, hentMotebehovHvisIkkeHentet);
  yield takeEvery(actions.SVAR_MOTEBEHOV_FORESPURT, svarMotebehov);
}
