import React from 'react';
import PropTypes from 'prop-types';
import { Route, Router } from 'react-router';
import DialogmoterContainer from '../sider/DialogmoterSide';
import MotebehovContainer from '../sider/MotebehovSide';
import DialogmoteSide from '../sider/DialogmoteSide';

const AppRouter = ({ history }) => {
  return (
    <Router history={history}>
      <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}`} component={DialogmoterContainer} />
      <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/behov`} component={MotebehovContainer} />
      <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/mote`} component={DialogmoteSide} />
      <Route path="*" component={DialogmoterContainer} />
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
