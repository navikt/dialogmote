import 'whatwg-fetch';
import 'babel-polyfill';
import { render } from 'react-dom';
import React from 'react';
import {
    applyMiddleware,
    combineReducers,
    compose,
    createStore,
} from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import {
    forlengInnloggetSesjon,
    setPerformOnHttpCalls,
    sjekkInnloggingssesjon,
} from '@navikt/digisyfo-npm';
import AppRouter from './routers/AppRouter';
import history from './history';
import rootSaga from './data/rootSaga';
import '../styles/styles.less';
import setPerformOnOppDialogHttpCalls from './oppfolgingsdialogNpm/setPerformOnOppDialogHttpCalls';
import reducers from './data/reducers';

const rootReducer = combineReducers(reducers);

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(sagaMiddleware),
));

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
    <Provider store={store}>
        <AppRouter history={history} />
    </Provider>,
    document.getElementById('maincontent'),
);

export {
    store,
    history,
};
