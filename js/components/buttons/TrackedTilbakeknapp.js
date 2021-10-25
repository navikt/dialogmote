import React from 'react';
import { Tilbakeknapp } from 'nav-frontend-ikonknapper';
import PropTypes from 'prop-types';
import { trackOnClick } from '../../amplitude/amplitude';

const texts = {
  trackingName: 'Tilbakeknapp',
};

export const TrackedTilbakeknapp = (props) => {
  const { onClick, trackingName, ...rest } = props;

  const modifiedOnClick = (event) => {
    trackOnClick(trackingName || texts.trackingName);
    // eslint-disable-next-line no-unused-expressions
    onClick && onClick(event);
  };

  return <Tilbakeknapp {...rest} onClick={modifiedOnClick} />;
};

TrackedTilbakeknapp.propTypes = {
  trackingName: PropTypes.string,
  onClick: PropTypes.func,
};
