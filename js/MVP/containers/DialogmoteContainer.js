import React from 'react';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Brodsmuler from '../../components/Brodsmuler';
import { dialogmoteBreadcrumb, statiskeURLer } from '../globals/paths';
import { TrackedLenke } from '../../components/buttons/TrackedLenke';
import { TrackedTilbakeknapp } from '../../components/buttons/TrackedTilbakeknapp';

const WrapperStyled = styled.div`
  display: flex;
  justify-content: center;
  background-color: #f1f1f1;
  padding: 32px;
`;

const ContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: stretch;
  max-width: 640px;
`;

const HeaderStyled = styled.header`
  margin: 32px 0;
  text-align: center;
`;

const TilbakeknappStyled = styled(TrackedTilbakeknapp)`
  width: 108px;
  margin-bottom: 32px;
`;

const BottomInfoStyled = styled.section`
  text-align: center;
  margin-top: auto;
`;

const texts = {
  bottomText: 'Vi bruker opplysningene også til å gjøre selve tjenesten bedre.',
  bottomUrl: 'Les mer om hvordan NAV behandler personopplysninger.',
};

const DialogmoteContainer = ({ title, breadcrumb = dialogmoteBreadcrumb, displayTilbakeknapp = false, children }) => {
  return (
    <WrapperStyled>
      <ContentStyled>
        <Brodsmuler brodsmuler={breadcrumb} />
        <HeaderStyled>
          <Sidetittel>{title}</Sidetittel>
        </HeaderStyled>
        {children}
        {displayTilbakeknapp && <TilbakeknappStyled onClick={browserHistory.goBack} />}
        <BottomInfoStyled>
          <Normaltekst>{texts.bottomText}</Normaltekst>
          <TrackedLenke href={statiskeURLer.PERSONVERN_URL}>{texts.bottomUrl}</TrackedLenke>
        </BottomInfoStyled>
      </ContentStyled>
    </WrapperStyled>
  );
};

DialogmoteContainer.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  breadcrumb: PropTypes.array,
  displayTilbakeknapp: PropTypes.bool,
};

export default DialogmoteContainer;
