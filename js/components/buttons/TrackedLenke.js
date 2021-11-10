import React from 'react';
import PropTypes from 'prop-types';
import Lenke from 'nav-frontend-lenker';
import { trackOnClick } from '../../amplitude/amplitude';

export const TrackedLenke = (props) => {
  const { children, trackingName, onClick, ...rest } = props;

  const modifiedOnClick = (event) => {
    trackOnClick(trackingName || children);
    // eslint-disable-next-line no-unused-expressions
    onClick && onClick(event);
  };

  return (
    <Lenke {...rest} onClick={modifiedOnClick}>
      {children}
    </Lenke>
  );
};

TrackedLenke.propTypes = {
  children: PropTypes.string,
  trackingName: PropTypes.string,
  onClick: PropTypes.func,
};
