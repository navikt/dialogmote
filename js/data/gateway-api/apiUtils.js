import Ajax from 'simple-ajax';

let performOnHttpCalls = () => {
  return undefined;
};

export const setPerformOnHttpCalls = (_performOnHttpCalls) => {
  // eslint-disable-next-line no-unused-vars
  performOnHttpCalls = _performOnHttpCalls;
};

// TODO: Port from digisyfo-npm, remove me sometime soon
export const getAjax = (url) => {
  const ajax = new Ajax(url);
  const promise = new Promise((resolve, reject) => {
    ajax.on('success', (respons, responsTekst) => {
      resolve(responsTekst);
    });
    ajax.on('error', reject);
  });
  ajax.send();
  return promise;
};
