import React from 'react';
import PropTypes from 'prop-types';
import { Knapp } from 'nav-frontend-knapper';
import { trackOnClick } from '../../amplitude/amplitude';

export const TrackedKnapp = (props) => {
  const { children, trackingName, onClick, ...rest } = props;

  const modifiedOnClick = (event) => {
    trackOnClick(trackingName || children);
    // eslint-disable-next-line no-unused-expressions
    onClick && onClick(event);
  };

  return (
    <Knapp {...rest} onClick={modifiedOnClick}>
      {children}
    </Knapp>
  );
};

TrackedKnapp.propTypes = {
  children: PropTypes.string,
  trackingName: PropTypes.string,
  onClick: PropTypes.func,
};
