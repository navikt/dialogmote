import { SVAR_MOTEBEHOV_SENDER, SVAR_MOTEBEHOV_SENDT, SVAR_MOTEBEHOV_FEILET } from '../motebehov/motebehov_actions';

const initiellState = {
  sender: false,
  sendt: false,
  sendingFeilet: false,
};

export default function momtebehovSvar(state = initiellState, action = {}) {
  switch (action.type) {
    case SVAR_MOTEBEHOV_SENDER:
      return {
        ...state,
        sender: true,
        sendt: false,
        sendingFeilet: false,
      };
    case SVAR_MOTEBEHOV_SENDT:
      return {
        ...state,
        sender: false,
        sendt: true,
      };
    case SVAR_MOTEBEHOV_FEILET:
      return {
        ...state,
        sender: false,
        sendingFeilet: true,
      };
    default:
      return state;
  }
}
