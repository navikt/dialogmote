import React from 'react';
import styled from 'styled-components';
import DialogmotePanel from '../../../containers/DialogmotePanel';

const DialogmotePanelStyled = styled(DialogmotePanel)`
  margin-bottom: 16px;
`;

const SvarMoteBehovContent = () => {
  return (
    <React.Fragment>
      <DialogmotePanelStyled />
    </React.Fragment>
  );
};

SvarMoteBehovContent.propTypes = {};

export default SvarMoteBehovContent;
