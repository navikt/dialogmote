import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { AVBRUTT } from '@/utils/moteUtils';
import ButtonLenke from '../../../components/ButtonLenke';
import DialogmotePanel from '../../../containers/DialogmotePanel';
import { MOTEPLANLEGGER_URL } from '@/MVP/globals/paths';
import { KalenderInnkallingAvlystImage, KalenderInnkallingImage } from '@/images/imageComponents';

const SectionStyled = styled.section`
  margin: 32px 0;
`;

const texts = {
  title: 'Tidspunkt for dialogmøte',
  text: 'Her er vårt forslag til tidspunkt for dialogmøte.',
  button: 'Svar på om det passer',
  titleAvbrutt: 'En forespørsel om møte er avbrutt',
  textAvbrutt: 'Vi sendte deg tidligere en forespørsel om tid og sted til et dialogmøte, dette er avbrutt.',
  buttonAvbrutt: 'Se detaljer',
};

const Panel = ({ title, text, icon, buttonText }) => {
  return (
    <DialogmotePanel title={title} icon={icon}>
      <SectionStyled>{text}</SectionStyled>
      <ButtonLenke mini to={MOTEPLANLEGGER_URL}>
        {buttonText}
      </ButtonLenke>
    </DialogmotePanel>
  );
};

Panel.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.string,
  buttonText: PropTypes.string,
};

const MoteplanleggerPanel = ({ modus }) => {
  if (modus === AVBRUTT) {
    return (
      <Panel
        title={texts.titleAvbrutt}
        text={texts.textAvbrutt}
        icon={KalenderInnkallingAvlystImage}
        buttonText={texts.buttonAvbrutt}
      />
    );
  }
  return <Panel title={texts.title} text={texts.text} icon={KalenderInnkallingImage} buttonText={texts.button} />;
};

MoteplanleggerPanel.propTypes = { modus: PropTypes.string };

export default MoteplanleggerPanel;
