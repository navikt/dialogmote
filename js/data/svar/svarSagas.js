import { call, fork, put, takeEvery } from 'redux-saga/effects';
import { log } from '@/logging/log';
import { post } from '@/api/axios';
import { SEND_SVAR_FORESPURT, senderSvar, sendSvarFeilet, svarSendt } from './svar_actions';
import { MOTEADMIN_API } from '@/MVP/globals/paths';

export function* sendSvar(action) {
  yield put(senderSvar());
  try {
    const url = `${MOTEADMIN_API}/moter/${action.moteUuid}/send`;
    yield call(post, url, {
      valgteAlternativIder: action.data,
      deltakertype: action.deltakertype,
    });
    yield put(svarSendt(action.data, action.deltakertype));
  } catch (e) {
    log(e);
    yield put(sendSvarFeilet());
  }
}

function* watchSendSvar() {
  yield takeEvery(SEND_SVAR_FORESPURT, sendSvar);
}

export default function* svarSagas() {
  yield fork(watchSendSvar);
}
