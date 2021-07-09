import { API_NAVN, hentSyfoApiUrl } from '../../data/gateway-api/gatewayApi';

export const ISDIALOGMOTE_API_BASE_PATH = `/dialogmote/api/v1/arbeidstaker/brev`;

export const LANDING_URL = `${process.env.REACT_APP_CONTEXT_ROOT}`;

export const MOTEBEHOV_URL = `${process.env.REACT_APP_CONTEXT_ROOT}/behov`;
export const MOTEBEHOV_API = `${hentSyfoApiUrl(API_NAVN.SYFOMOTEBEHOV)}/v2/arbeidstaker/motebehov`;

export const MOTEINNKALLING_URL_MVP = `${process.env.REACT_APP_CONTEXT_ROOT}/mvp/mote`;

export const MOTEREFERAT_URL = `${process.env.REACT_APP_CONTEXT_ROOT}/referat`;

// Breadcrumbs
const dittSykefravarBreadcrumb = [
  {
    tittel: 'Ditt sykefravær',
    sti: '/sykefravaer',
    erKlikkbar: true,
  },
];

export const dialogmoteBreadcrumb = [
  ...dittSykefravarBreadcrumb,
  {
    tittel: 'Dialogmøter',
    sti: LANDING_URL,
    erKlikkbar: true,
  },
];

export const motereferatBreadcrumb = [
  ...dialogmoteBreadcrumb,
  {
    tittel: 'Referat fra dialogmøte',
    sti: MOTEREFERAT_URL,
    erKlikkbar: true,
  },
];

export const innkallelseBreadcrumb = (title) => [
  ...dialogmoteBreadcrumb,
  {
    tittel: title,
    sti: MOTEINNKALLING_URL_MVP,
    erKlikkbar: true,
  },
];
