import React from 'react';
import PropTypes from 'prop-types';
import { Flatknapp } from 'nav-frontend-knapper';
import { trackOnClick } from '../../amplitude/amplitude';

export const TrackedFlatknapp = (props) => {
  const { children, trackingName, onClick, ...rest } = props;

  const modifiedOnClick = (event) => {
    trackOnClick(trackingName || children);
    // eslint-disable-next-line no-unused-expressions
    onClick && onClick(event);
  };

  return (
    <Flatknapp {...rest} onClick={modifiedOnClick}>
      {children}
    </Flatknapp>
  );
};

TrackedFlatknapp.propTypes = {
  children: PropTypes.string,
  trackingName: PropTypes.string,
  onClick: PropTypes.func,
};
