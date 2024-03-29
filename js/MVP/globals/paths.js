import { isLabs } from '@/utils/urlUtils';

export const ISDIALOGMOTE_API_BASE_PATH = `${process.env.REACT_APP_CONTEXT_ROOT}/api/v1/arbeidstaker/brev`;
export const MOTEBEHOV_API = `${process.env.REACT_APP_CONTEXT_ROOT}/api/motebehov`;
export const MOTEADMIN_API = `${process.env.REACT_APP_CONTEXT_ROOT}/api/moteadmin`;

export const LANDING_URL = `${process.env.REACT_APP_CONTEXT_ROOT}`;
export const MOTEINNKALLING_URL = `${process.env.REACT_APP_CONTEXT_ROOT}/moteinnkallelse`;
export const MOTEPLANLEGGER_URL = `${process.env.REACT_APP_CONTEXT_ROOT}/mote`;
export const MELD_BEHOV_URL = `${process.env.REACT_APP_CONTEXT_ROOT}/behov/meld`;
export const SVAR_BEHOV_URL = `${process.env.REACT_APP_CONTEXT_ROOT}/behov/svar`;
export const MOTEREFERAT_URL = `${process.env.REACT_APP_CONTEXT_ROOT}/referat`;
export const DITT_SYKEFRAVAER_URL = isLabs()
  ? 'https://sykefravaer.labs.nais.io/syk/sykefravaer'
  : process.env.REACT_APP_SYKEFRAVAER_ROOT;

export const LANDING_URL_AVBRUTT_MELD_BEHOV = `${process.env.REACT_APP_CONTEXT_ROOT}/avbruttMeldBehov`;

export const OPPFOLGINGSPLANER_URL = process.env.REACT_APP_OPPFOLGINGSPLAN_CONTEXT_ROOT;

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
    sti: DITT_SYKEFRAVAER_URL,
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
