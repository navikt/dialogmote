export const isProd = () => window.location.href.indexOf('www.nav') > -1;

export const isLabs = () => window.location.href.indexOf('.labs.nais.') > -1;

export const isLocal = () => window.location.href.indexOf('localhost') > -1;
