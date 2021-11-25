import { isLabs, isLocal, isProd } from '@/utils/urlUtils';

export const hentLoginUrl = () => {
  if (window.location.href.indexOf('www.nav') > -1) {
    // Prod
    return 'https://loginservice.nav.no/login';
  } else if (isLocal()) {
    // Lokalt
    return 'http://localhost:8080/syfoapi/local/cookie';
  }
  // Preprod
  return 'https://loginservice.dev.nav.no/login';
};

export const API_NAVN = {
  SYFOMOTEADMIN: 'syfomoteadmin',
  SYFOMOTEBEHOV: 'syfomotebehov',
  ISDIALOGMOTE: 'isdialogmote',
  SYFOOPPFOLGINGSPLANSERVICE: 'syfooppfolgingsplanservice',
};

export const hentSyfoApiUrl = (appNavn) => {
  if (isProd()) {
    // Prod
    return `https://syfoapi.nav.no/${appNavn}/api`;
  } else if (isLocal() || isLabs()) {
    // Lokalt
    return `/${appNavn}/api`;
  }
  // Preprod
  return `https://syfoapi.dev.nav.no/${appNavn}/api`;
};

export const defaultRequestHeaders = (): Record<string, string> => {
  return {
    'Content-Type': 'application/json',
  };
};
