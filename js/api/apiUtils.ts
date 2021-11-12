export const hentLoginUrl = () => {
  if (window.location.href.indexOf('tjenester.nav') > -1) {
    // Prod
    return 'https://loginservice.nav.no/login';
  }
  if (window.location.href.indexOf('localhost') > -1) {
    // Lokalt
    return 'http://localhost:8080/syfoapi/local/cookie';
  }
  // Preprod
  return 'https://loginservice-q.nav.no/login';
};

export const API_NAVN = {
  SYFOMOTEADMIN: 'syfomoteadmin',
  SYFOMOTEBEHOV: 'syfomotebehov',
  ISDIALOGMOTE: 'isdialogmote',
  SYFOOPPFOLGINGSPLANSERVICE: 'syfooppfolgingsplanservice',
};

export const hentSyfoApiUrl = (appNavn) => {
  const url = window && window.location && window.location.href ? window.location.href : '';

  if (appNavn === API_NAVN.ISDIALOGMOTE) {
    // Lokalt
    if (url.indexOf('localhost') > -1) {
      return `/${appNavn}/api`;
    }

    return 'https://isdialogmote.dev.nav.no/api';
  }

  if (url.indexOf('tjenester.nav') > -1) {
    // Prod
    return `https://syfoapi.nav.no/${appNavn}/api`;
  }
  if (url.indexOf('localhost') > -1 || url.indexOf('herokuapp') > -1) {
    // Lokalt
    return `/${appNavn}/api`;
  }
  // Preprod
  return `https://syfoapi-q.nav.no/${appNavn}/api`;
};

export const defaultRequestHeaders = (): Record<string, string> => {
  return {
    'Content-Type': 'application/json',
  };
};
