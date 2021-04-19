import { SVAR_SENDT, SEND_SVAR_FEILET, SENDER_SVAR } from './svar_actions';

const defaultState = {
  data: {},
  sender: false,
  sendingFeilet: false,
  sendt: false,
};

const svar = (state = defaultState, action) => {
  switch (action.type) {
    case SENDER_SVAR: {
      return Object.assign({}, state, {
        sender: true,
        sendingFeilet: false,
      });
    }
    case SEND_SVAR_FEILET: {
      return Object.assign({}, state, {
        sender: false,
        sendingFeilet: true,
      });
    }
    case SVAR_SENDT: {
      return Object.assign({}, state, {
        sender: false,
        sendingFeilet: false,
      });
    }
    default: {
      return state;
    }
  }
};

export default svar;
