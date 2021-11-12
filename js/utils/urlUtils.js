export const erPaaHeroku = () => {
  const url = window.location.href;
  return url.indexOf('heroku') > -1;
};

export const getSykefravaerUrl = (sti) => {
  return sti ? `${window.location.origin}${sti}` : `${window.location.origin}/sykefravaer`;
};

export const oppfolgingsplanUrl = () => {
  const endUrl = `${process.env.REACT_APP_OPPFOLGINGSPLAN_CONTEXT_ROOT}/oppfolgingsplaner`;
  return erPaaHeroku() ? `https://oppfolgingsplan.herokuapp.com${endUrl}` : endUrl;
};
