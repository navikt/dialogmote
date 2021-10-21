import 'whatwg-fetch';
import 'babel-polyfill';
import { render } from 'react-dom';
import React from 'react';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { setPerformOnHttpCalls } from '@navikt/digisyfo-npm';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import AppRouter from './routers/AppRouter';
import history from './history';
import rootSaga from './data/rootSaga';
import '../styles/styles.less';
import setPerformOnOppDialogHttpCalls from './oppfolgingsdialogNpm/setPerformOnOppDialogHttpCalls';
import reducers from './data/reducers';
import { forlengInnloggetSesjon, sjekkInnloggingssesjon } from './timeout/timeout_actions';
import { minutesToMillis } from './MVP/utils';
import { initAmplitude } from './amplitude/amplitude';

initAmplitude();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: minutesToMillis(60),
      staleTime: minutesToMillis(30),
    },
  },
});

const rootReducer = combineReducers(reducers);

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

// <OBS>: Minimer antall kall som gjøres her!
store.dispatch(forlengInnloggetSesjon());
// </OBS>

setPerformOnHttpCalls(() => {
  store.dispatch(forlengInnloggetSesjon());
});
setPerformOnOppDialogHttpCalls(() => {
  store.dispatch(forlengInnloggetSesjon());
});

setInterval(() => {
  store.dispatch(sjekkInnloggingssesjon());
}, 5000);

render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <AppRouter history={history} />
    </Provider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
  document.getElementById('maincontent')
);

export { store, history };
