import React from 'react';
import PropTypes from 'prop-types';
import AlertStripe from 'nav-frontend-alertstriper';
import styled from 'styled-components';
import AppSpinner from '../../../components/AppSpinner';
import DialogmoteContainer from '../../containers/DialogmoteContainer';
import { brevTypes } from '../../globals/constants';
import { motereferatBreadcrumb } from '../../globals/paths';
import { useBrev } from '../../hooks/brev';
import { getProgrammaticDateFormat } from '../../utils';
import MotereferatContent from './components/MotereferatContent';

const AlertStripeStyled = styled(AlertStripe)`
  margin-bottom: 32px;
`;

const texts = {
  title: 'Referat fra dialogmøte',
};

const getReferat = (brev, date) => {
  const referater = brev.filter(({ brevType }) => brevType === brevTypes.REFERAT);

  if (referater.length === 0) {
    return null;
  }

  if (!date) {
    return referater[0];
  }

  const referat = referater.find(({ tid }) => getProgrammaticDateFormat(tid) === date);

  if (!referat) {
    return null;
  }

  return referat;
};

const Motereferat = ({ params }) => {
  const { data, isLoading, isError } = useBrev();

  if (isLoading) {
    return <AppSpinner />;
  }

  if (isError) {
    return (
      <DialogmoteContainer title={texts.title} breadcrumb={motereferatBreadcrumb} displayTilbakeknapp>
        <AlertStripeStyled type="feil">
          Akkurat nå mangler det noe her. Vi har tekniske problemer som vi jobber med å løse. Prøv gjerne igjen om en
          stund.
        </AlertStripeStyled>
      </DialogmoteContainer>
    );
  }

  const { date } = params;
  const referat = getReferat(data, date);

  return (
    <DialogmoteContainer title={texts.title} breadcrumb={motereferatBreadcrumb} displayTilbakeknapp>
      <MotereferatContent referat={referat} />
    </DialogmoteContainer>
  );
};

Motereferat.propTypes = {
  params: PropTypes.object,
};

export default Motereferat;
