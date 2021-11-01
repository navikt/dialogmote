import React from 'react';
import PropTypes from 'prop-types';
import { TrackedHovedknapp } from '../../buttons/TrackedHovedknapp';
import { TrackedLink } from '../../buttons/TrackedLink';

const texts = {
  buttonAbort: 'Avbryt',
  buttonSend: 'Send svar',
};

const MotebehovSkjemaKnapper = ({ sender }) => {
  return (
    <div className="knapperad knapperad--justervenstre">
      <div className="knapperad__element">
        <TrackedHovedknapp type="submit" disabled={sender} spinner={sender}>
          {texts.buttonSend}
        </TrackedHovedknapp>
      </div>
      <div className="knapperad__element">
        <TrackedLink className="lenke" to="/dialogmote">
          {texts.buttonAbort}
        </TrackedLink>
      </div>
    </div>
  );
};
MotebehovSkjemaKnapper.propTypes = {
  sender: PropTypes.bool,
};

export default MotebehovSkjemaKnapper;
