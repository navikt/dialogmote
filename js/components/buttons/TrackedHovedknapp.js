import React from 'react';
import PropTypes from 'prop-types';
import { Hovedknapp } from 'nav-frontend-knapper';
import { trackOnClick } from '../../amplitude/amplitude';

export const TrackedHovedknapp = (props) => {
  const { children, trackingName, onClick, ...rest } = props;

  const modifiedOnClick = (event) => {
    trackOnClick(trackingName || children);
    // eslint-disable-next-line no-unused-expressions
    onClick && onClick(event);
  };

  return (
    <Hovedknapp {...rest} onClick={modifiedOnClick}>
      {children}
    </Hovedknapp>
  );
};

TrackedHovedknapp.propTypes = {
  children: PropTypes.string,
  trackingName: PropTypes.string,
  onClick: PropTypes.func,
};
