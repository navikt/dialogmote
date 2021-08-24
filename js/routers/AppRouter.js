import PropTypes from 'prop-types';
import React from 'react';
import { Route, Router } from 'react-router';
import Landing from '../MVP/views/landing/Landing';
import Motebehov from '../MVP/views/motebehov/Motebehov';
import Moteinnkallelse from '../MVP/views/moteinnkallelse/Moteinnkallelse';
import Motereferat from '../MVP/views/motereferat/Motereferat';
import DialogmoteSide from '../sider/DialogmoteSide';
import MotebehovContainer from '../sider/MotebehovSide';

const AppRouter = ({ history }) => {
  return (
    <Router history={history}>
      <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}`} component={Landing} />
      <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/behov`} component={MotebehovContainer} />
      <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/mvp/behov`} component={Motebehov} />
      <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/mote`} component={DialogmoteSide} />
      <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/mvp/mote`} component={Moteinnkallelse} />
      <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/mvp/moteplanleggingsstatus`} component={DialogmoteSide} />
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
