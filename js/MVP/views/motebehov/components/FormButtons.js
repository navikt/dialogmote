import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { LANDING_URL } from '@/MVP/globals/paths';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Link } from 'react-router';

const ButtonGroupStyled = styled.div`
  display: flex;
  gap: 32px;
  align-items: center;
  margin-top: 64px;
`;

const texts = {
  buttonAbort: 'Avbryt',
  buttonSend: 'Send svar',
};

const FormButtons = ({ isSubmitting }) => {
  return (
    <ButtonGroupStyled>
      <Hovedknapp type="submit" disabled={isSubmitting} spinner={isSubmitting}>
        {texts.buttonSend}
      </Hovedknapp>

      <Link className="lenke" to={LANDING_URL}>
        {texts.buttonAbort}
      </Link>
    </ButtonGroupStyled>
  );
};
FormButtons.propTypes = {
  isSubmitting: PropTypes.bool,
};

export default FormButtons;
