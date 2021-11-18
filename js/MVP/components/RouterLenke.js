import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router';
import { trackOnClick } from '@/amplitude/amplitude';

const LinkStyled = styled(Link)`
  width: fit-content;
`;

function RouterLenke({ to, children, trackingName }) {
  return (
    <LinkStyled to={to} className="lenke" onClick={() => trackOnClick(trackingName)}>
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
