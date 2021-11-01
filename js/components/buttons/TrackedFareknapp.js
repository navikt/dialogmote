import React from 'react';
import { Fareknapp } from 'nav-frontend-knapper';
import PropTypes from 'prop-types';
import { trackOnClick } from '../../amplitude/amplitude';

export const TrackedFareknapp = (props) => {
  const { children, trackingName, onClick, ...rest } = props;

  const modifiedOnClick = (event) => {
    trackOnClick(trackingName || children);
    // eslint-disable-next-line no-unused-expressions
    onClick && onClick(event);
  };

  return (
    <Fareknapp {...rest} onClick={modifiedOnClick}>
      {children}
    </Fareknapp>
  );
};

TrackedFareknapp.propTypes = {
  children: PropTypes.string,
  trackingName: PropTypes.string,
  onClick: PropTypes.func,
};
