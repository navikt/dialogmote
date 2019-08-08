import {
    all,
    call,
    fork,
    put,
    takeEvery,
} from 'redux-saga/effects';
import {
    get,
    log,
} from '@navikt/digisyfo-npm';
import * as actions from './ledereActions';

export function* hentLedere() {
    yield put(actions.henterLedere());
    try {
        const data = yield call(get, `${process.env.REACT_APP_SYFOREST_ROOT}/naermesteledere`);
        yield put(actions.ledereHentet(data));
    } catch (e) {
        log(e);
        yield put(actions.hentLedereFeilet());
    }
}

function* watchHentLedere() {
    yield takeEvery(actions.HENT_LEDERE_FORESPURT, hentLedere);
}

export default function* ledereSagas() {
    yield all([
        fork(watchHentLedere),
    ]);
}
