import { API_NAVN, hentSyfoApiUrl } from '../../data/gateway-api/gatewayApi';

export const ISDIALOGMOTE_API_BASE_PATH = `/dialogmote/api/v1/arbeidstaker/brev`;
export const MOTEBEHOV_API = `${hentSyfoApiUrl(API_NAVN.SYFOMOTEBEHOV)}/v2/arbeidstaker/motebehov`;
export const MOTEADMIN_API = `${hentSyfoApiUrl(API_NAVN.SYFOMOTEADMIN)}/bruker/arbeidstaker/moter/siste`;

export const LANDING_URL = `${process.env.REACT_APP_CONTEXT_ROOT}`;
export const MOTEINNKALLING_URL = `${process.env.REACT_APP_CONTEXT_ROOT}/mvp/mote`;
export const MOTEBEHOV_URL = `${process.env.REACT_APP_CONTEXT_ROOT}/behov`;
export const MOTEREFERAT_URL = `${process.env.REACT_APP_CONTEXT_ROOT}/referat`;

export const OPPFOLGINGSPLANER_URL = `${process.env.REACT_APP_OPPFOLGINGSPLAN_CONTEXT_ROOT}/oppfolgingsplaner`;

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
    sti: MOTEINNKALLING_URL,
    erKlikkbar: true,
  },
];

export const motebehoveBreadcrumb = [
  ...dialogmoteBreadcrumb,
  {
    tittel: 'Meld behov for møte',
    sti: MOTEBEHOV_URL,
    erKlikkbar: true,
  },
];
