import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { trackOnClick } from '../../amplitude/amplitude';

export const TrackedLink = (props) => {
  const { children, trackingName, onClick, ...rest } = props;

  const modifiedOnClick = (event) => {
    trackOnClick(trackingName || children);
    // eslint-disable-next-line no-unused-expressions
    onClick && onClick(event);
  };

  return (
    <Link {...rest} onClick={modifiedOnClick}>
      {children}
    </Link>
  );
};

TrackedLink.propTypes = {
  children: PropTypes.string,
  trackingName: PropTypes.string,
  onClick: PropTypes.func,
};