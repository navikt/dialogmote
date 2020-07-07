import {
    call,
    put,
    fork,
    takeEvery,
    all,
    select,
} from 'redux-saga/effects';
import { log } from '../../logging/log';
import {
    API_NAVN,
    hentSyfoApiUrl,
    get,
    post,
} from '../gateway-api/gatewayApi';
import * as actions from './motebehov_actions';
import { skalHenteMotebehov } from './motebehovSelectors';
import { input2RSLagreMotebehov } from '../../utils/motebehovUtils';

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

function* watchHentMotebehov() {
    yield takeEvery(actions.HENT_MOTEBEHOV_FORESPURT, hentMotebehovHvisIkkeHentet);
}

function* watchSvarMotebehov() {
    yield takeEvery(actions.SVAR_MOTEBEHOV_FORESPURT, svarMotebehov);
}

export default function* motebehovSagas() {
    yield all([
        fork(watchHentMotebehov),
        fork(watchSvarMotebehov),
    ]);
}
