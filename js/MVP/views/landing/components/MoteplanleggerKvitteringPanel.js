import ModalWrapper from 'nav-frontend-modal';
import Tekstomrade from 'nav-frontend-tekstomrade';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';
import { motePt } from '../../../../propTypes';
import { BEKREFTET, MOTESTATUS } from '../../../../utils/moteUtils';
import DialogmotePanel from '../../../containers/DialogmotePanel';
import BekreftelseKvittering from '../../moteplanlegger/components/BekreftelseKvittering';
import SvarKvittering from '../../moteplanlegger/components/SvarKvittering';
import { TrackedKnapp } from '../../../../components/buttons/TrackedKnapp';

const texts = {
  titleSvart: 'Du har svart på tidspunkt for dialogmøte',
  textSvart: 'Når tidspunktet er avklart, vil du få en innkalling i posten med mer informasjon om møtet.',
  buttonSvart: 'Se svaret ditt',

  titleBekreftet: 'Tid og sted for dialogmøtet er klart',
};

const DialogmotePanelStyled = styled(DialogmotePanel)`
  margin-bottom: 32px;
`;

const TekstomradeStyled = styled(Tekstomrade)`
  margin: 32px 0;
`;

const MoteplanleggerKvitteringPanel = ({ mote, modus }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  if (modus === BEKREFTET) {
    return (
      <DialogmotePanelStyled title={texts.titleBekreftet} icon="kalender-innkalling">
        <BekreftelseKvittering mote={mote} />
      </DialogmotePanelStyled>
    );
  }
  if (modus === MOTESTATUS) {
    return (
      <DialogmotePanelStyled title={texts.titleSvart} icon="kalender-innkalling">
        <TekstomradeStyled>{texts.textSvart}</TekstomradeStyled>
        <ModalWrapper
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          closeButton
          contentLabel="Møteplanlegger kvittering"
        >
          <div style={{ padding: '2rem 2.5rem', width: '31rem' }}>
            <SvarKvittering mote={mote} />
          </div>
        </ModalWrapper>

        <TrackedKnapp mini onClick={() => setIsModalOpen(true)}>
          {texts.buttonSvart}
        </TrackedKnapp>
      </DialogmotePanelStyled>
    );
  }
  return <div />;
};

MoteplanleggerKvitteringPanel.propTypes = { mote: motePt, modus: PropTypes.string };

export default MoteplanleggerKvitteringPanel;
