import { reducer as formReducer } from 'redux-form';
import mote from './moter/mote';
import svar from './svar/svar';
import motebehov from './motebehov/motebehov';
import motebehovSvar from './motebehov-svar/motebehovSvar';
import history from '../history';

const reducers = {
  history,
  mote,
  motebehov,
  motebehovSvar,
  svar,
  form: formReducer,
};

export default reducers;
