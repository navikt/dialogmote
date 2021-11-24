import FeilAlertStripe from '@/MVP/components/FeilAlertStripe';
import React from 'react';
import PropTypes from 'prop-types';
import AppSpinner from '../../../components/AppSpinner';
import DialogmoteContainer from '../../containers/DialogmoteContainer';
import { brevTypes } from '../../globals/constants';
import { motereferatBreadcrumb } from '../../globals/paths';
import { useBrev } from '../../queries/brev';
import { getProgrammaticDateFormat } from '../../utils';
import MotereferatContent from './components/MotereferatContent';

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
        <FeilAlertStripe />
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
