import React from 'react';
import DialogmoteContainer from '../../containers/DialogmoteContainer';
import VeilederLanding from './components/VeilederLanding';
import MotebehovPanel from './components/MotebehovPanel';
import MoteinnkallelsePanel from './components/MoteinnkallelsePanel';
import DialogmoteVideoPanel from './components/DialogmoteVideoPanel';
import MotereferatPanel from './components/MotereferatPanel';
import PreviousMotereferatPanel from './components/PreviousMotereferatPanel';
import { useBrev } from '../../hooks/moteinnkallelse';
import AppSpinner from '../../../components/AppSpinner';
import { REFERAT } from '../../globals/constants';
import { getShortDate } from '../../utils';
import MoteplanleggerPanel from './components/MoteplanleggerPanel';

const Landing = () => {
  const { data, status } = useBrev();

  if (status === 'loading') {
    return <AppSpinner />;
  }
  // const head = data[0];
  const tail = data.slice(1);

  const previousReferater = tail.filter((hendelse) => hendelse.brevType === REFERAT);

  const previousReferatDates = previousReferater.map(({ tid }) => getShortDate(tid));

  return (
    <DialogmoteContainer title="Dialogmøter" requestStatus={status}>
      <VeilederLanding />

      <MotebehovPanel />

      <MoteplanleggerPanel />

      <MoteinnkallelsePanel innkallelse={data[0]} />

      <MotereferatPanel date="FIX" />

      <PreviousMotereferatPanel previousReferatDates={previousReferatDates} />

      <DialogmoteVideoPanel />
    </DialogmoteContainer>
  );
};

Landing.propTypes = {};

export default Landing;
