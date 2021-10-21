import React from 'react';
import styled from 'styled-components';
import Icon from '../../../components/Icon';

const texts = {
  text1: 'Dialogmøter er ikke aktuelt for deg nå siden du ikke er sykmeldt.',
};

const IkkeSykmeldtContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
`;

const IkkeSykmeldtContent = styled.div`
  align-self: center;
`;

const IkkeSykmeldtLanding = () => {
  return (
    <IkkeSykmeldtContentWrapper>
      <IkkeSykmeldtContent>
        <Icon icon="dialog-report-gra" />
      </IkkeSykmeldtContent>
      <IkkeSykmeldtContent style={{ marginBottom: '32px' }}>{texts.text1}</IkkeSykmeldtContent>
    </IkkeSykmeldtContentWrapper>
  );
};

IkkeSykmeldtLanding.propTypes = {};

export default IkkeSykmeldtLanding;
