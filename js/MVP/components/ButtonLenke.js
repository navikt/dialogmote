import React from 'react';
import PropTypes from 'prop-types';
import { TrackedLink } from '../../components/buttons/TrackedLink';

function ButtonLenke({ to, children }) {
  return (
    <TrackedLink to={to} className="knapp knapp--hoved knapp--mini">
      {children}
    </TrackedLink>
  );
}

ButtonLenke.propTypes = {
  children: PropTypes.string,
  to: PropTypes.string,
};

export default ButtonLenke;
