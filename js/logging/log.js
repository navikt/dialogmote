const createLogger = () => {
  if (window.location.search.indexOf('log=true') > -1 || process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line
    return console.log;
  }
  return () => undefined;
};

export const log = createLogger();
