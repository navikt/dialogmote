import React from 'react';
import PropTypes from 'prop-types';
import { Route, Router } from 'react-router';
import DialogmoterContainer from '../sider/DialogmoterSide';
import MotebehovContainer from '../sider/MotebehovSide';
import DialogmoteSide from '../sider/DialogmoteSide';
import Landing from '../MVP/views/landing/Landing';
import Motereferat from '../MVP/views/motereferat/Motereferat';
import Moteinnkallelse from '../MVP/views/moteinnkallelse/Moteinnkallelse';
import Motebehov from '../MVP/views/motebehov/Motebehov';

const AppRouter = ({ history }) => {
  return (
    <Router history={history}>
      <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}`} component={Landing} />
      <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/behov`} component={MotebehovContainer} />
      <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/mvp/behov`} component={Motebehov} />
      <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/mote`} component={DialogmoteSide} />
      <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/mvp/mote`} component={Moteinnkallelse} />
      <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/referat(/:date)`} component={Motereferat} />
      <Route path="*" component={Landing} />
    </Router>
  );
};

AppRouter.propTypes = {
  history: PropTypes.shape({
    replace: PropTypes.func,
    push: PropTypes.func,
  }),
};

export default AppRouter;
