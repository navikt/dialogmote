import PropTypes from 'prop-types';
import React from 'react';
import { Route, Router } from 'react-router';
import { MOTEINNKALLING_URL, MOTEPLANLEGGER_URL } from '../MVP/globals/paths';
import Landing from '../MVP/views/landing/Landing';
import Moteinnkallelse from '../MVP/views/moteinnkallelse/Moteinnkallelse';
import Motereferat from '../MVP/views/motereferat/Motereferat';
import DialogmoteSide from '../sider/DialogmoteSide';
import MotebehovContainer from '../sider/MotebehovSide';

const AppRouter = ({ history }) => {
  return (
    <Router history={history}>
      <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}`} component={Landing} />
      <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/behov`} component={MotebehovContainer} />
      <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/mote`} component={DialogmoteSide} />
      <Route path={MOTEINNKALLING_URL} component={Moteinnkallelse} />
      <Route path={MOTEPLANLEGGER_URL} component={DialogmoteSide} />
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
