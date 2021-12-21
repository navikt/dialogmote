import React, { ReactElement } from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { trackOnClick } from '@/amplitude/amplitude';
import { Link } from 'react-router';

const texts = {
  buttonAbort: 'Avbryt',
  buttonSend: 'Send svar',
};

interface Props {
  sender: boolean;
  trackingName: string;
  cancelLinkTo: string;
}

const MotebehovSkjemaKnapper = ({ sender, trackingName, cancelLinkTo }: Props): ReactElement => {
  return (
    <div className="knapperad knapperad--justervenstre">
      <div className="knapperad__element">
        <Hovedknapp disabled={sender} spinner={sender} onClick={() => trackOnClick(trackingName)}>
          {texts.buttonSend}
        </Hovedknapp>
      </div>
      <div className="knapperad__element">
        <Link className="lenke" to={cancelLinkTo}>
          {texts.buttonAbort}
        </Link>
      </div>
    </div>
  );
};

export default MotebehovSkjemaKnapper;
