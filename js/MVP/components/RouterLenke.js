import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TrackedLink } from '../../components/buttons/TrackedLink';

const LinkStyled = styled(TrackedLink)`
  width: fit-content;
`;

function RouterLenke({ to, children, trackingName }) {
  return (
    <LinkStyled to={to} className="lenke" trackingName={trackingName}>
      {children}
    </LinkStyled>
  );
}

RouterLenke.propTypes = {
  children: PropTypes.node,
  trackingName: PropTypes.string,
  to: PropTypes.string,
};

export default RouterLenke;
