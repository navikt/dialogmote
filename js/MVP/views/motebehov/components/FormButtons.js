import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TrackedHovedknapp } from '../../../../components/buttons/TrackedHovedknapp';
import { TrackedLink } from '../../../../components/buttons/TrackedLink';

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
      <TrackedHovedknapp type="submit" disabled={isSubmitting} spinner={isSubmitting}>
        {texts.buttonSend}
      </TrackedHovedknapp>

      <TrackedLink className="lenke" to="/dialogmote">
        {texts.buttonAbort}
      </TrackedLink>
    </ButtonGroupStyled>
  );
};
FormButtons.propTypes = {
  isSubmitting: PropTypes.bool,
};

export default FormButtons;
