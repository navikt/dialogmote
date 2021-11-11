import React from 'react';
import DialogmoteContainer from '../../containers/DialogmoteContainer';
import AppSpinner from '../../../components/AppSpinner';
import { motebehoveBreadcrumb } from '../../globals/paths';
import { useMotebehov } from '../../hooks/motebehov';
import SvarMoteBehovContent from './components/SvarMotebehovContent';

const texts = {
  title: 'Meld behov for møte',
};

const Motebehov = () => {
  const motebehov = useMotebehov();

  if (motebehov.isLoading) {
    return <AppSpinner />;
  }

  return (
    <DialogmoteContainer title={texts.title} breadcrumb={motebehoveBreadcrumb}>
      <SvarMoteBehovContent />
    </DialogmoteContainer>
  );
};

export default Motebehov;
