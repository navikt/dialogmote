import { reducer as formReducer } from 'redux-form';
import brukerinfo from './brukerinfo/brukerinfo';
import mote from './moter/mote';
import svar from './svar/svar';
import motebehov from './motebehov/motebehov';
import motebehovSvar from './motebehov-svar/motebehovSvar';
import history from '../history';
import timeout from '../timeout/timeout';

const reducers = {
  brukerinfo,
  history,
  mote,
  motebehov,
  motebehovSvar,
  svar,
  timeout,
  form: formReducer,
};

export default reducers;
