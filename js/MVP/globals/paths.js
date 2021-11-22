import { API_NAVN, hentSyfoApiUrl } from '@/api/apiUtils';

export const ISDIALOGMOTE_API_BASE_PATH = `/dialogmote/api/v1/arbeidstaker/brev`;
export const MOTEBEHOV_API = `${hentSyfoApiUrl(API_NAVN.SYFOMOTEBEHOV)}/v2/arbeidstaker/motebehov`;
export const MOTEADMIN_API = `${hentSyfoApiUrl(API_NAVN.SYFOMOTEADMIN)}/bruker/arbeidstaker/moter/siste`;
export const SYFOOPPFOLGINGSPLANSERVICE_API = `${hentSyfoApiUrl(
  API_NAVN.SYFOOPPFOLGINGSPLANSERVICE
)}/arbeidstaker/sykmeldinger?today=true`;

export const LANDING_URL = `${process.env.REACT_APP_CONTEXT_ROOT}`;
export const MOTEINNKALLING_URL = `${process.env.REACT_APP_CONTEXT_ROOT}/moteinnkallelse`;
export const MOTEPLANLEGGER_URL = `${process.env.REACT_APP_CONTEXT_ROOT}/mote`;
export const MOTEBEHOV_URL = `${process.env.REACT_APP_CONTEXT_ROOT}/behov`;
export const MOTEREFERAT_URL = `${process.env.REACT_APP_CONTEXT_ROOT}/referat`;

export const OPPFOLGINGSPLANER_URL = `${process.env.REACT_APP_OPPFOLGINGSPLAN_CONTEXT_ROOT}/oppfolgingsplaner`;

// Statiske URLer
export const statiskeURLer = {
  KONTAKT_INFO_URL: 'https://www.nav.no/person/kontakt-oss/nb/skriv-til-oss',
  PERSONVERN_URL: 'http://www.nav.no/personvern',
  DIALOGMOTE_INFO_URL:
    'https://www.nav.no/no/bedrift/oppfolging/sykmeldt-arbeidstaker/relatert-informasjon/slik-folger-du-opp-sykmeldte/dialogmote-2-og-3-nav_kap',
  VIDEOMOTE_INFO_URL: 'https://www.nav.no/no/nav-og-samfunn/kontakt-nav/slik-deltar-du-i-videomote-med-nav',
};

// Breadcrumbs
const dittSykefravarBreadcrumb = [
  {
    tittel: 'Ditt sykefravær',
    sti: '/sykefravaer',
    erKlikkbar: true,
  },
];

export const emptyBreadcrumb = () => {
  return dittSykefravarBreadcrumb;
};

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
