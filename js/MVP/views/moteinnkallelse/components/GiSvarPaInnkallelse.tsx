import Tekstomrade from 'nav-frontend-tekstomrade';
import { Radio, RadioGruppe } from 'nav-frontend-skjema';
import { Hovedknapp } from 'nav-frontend-knapper';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useSvarPaInnkallelse } from '@/MVP/queries/brev';
import { SvarType } from '@/api/types/brevTypes';

const Svar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  border-radius: 4px;
  padding: 32px;
  background-color: white;
  margin-top: 32px;
`;

const Inline = styled.div`
  display: inline-flex;
`;

interface Props {
  brevUuid: string;
}

export function GiSvarPaInnkallelse({ brevUuid }: Props) {
  const svarPaInnkallelse = useSvarPaInnkallelse(brevUuid);
  const [selectedSvar, setSelectedSvar] = useState<SvarType>();

  const sendSvar = () => {
    if (selectedSvar) {
      svarPaInnkallelse.mutate({ svarType: selectedSvar });
    }
  };

  return (
    <Svar>
      <Tekstomrade>
        Det er et krav at du deltar i dialogmøter i løpet av sykefraværet. Passer ikke møtetidspunktet? Be om endring.
      </Tekstomrade>
      <Tekstomrade>Alle felt er obligatoriske.</Tekstomrade>
      <RadioGruppe legend="Svar på innkallingen">
        <Radio label={'Jeg kommer'} name="svar" onChange={() => setSelectedSvar('KOMMER')} />
        <Radio
          label={'Jeg ønsker å endre tidspunkt eller sted'}
          name="svar"
          onChange={() => setSelectedSvar('NYTT_TID_STED')}
        />
        <Radio label={'Jeg ønsker å avlyse'} name="svar" onChange={() => setSelectedSvar('KOMMER_IKKE')} />
      </RadioGruppe>
      <Inline>
        <Hovedknapp onClick={sendSvar}>Send svar</Hovedknapp>
      </Inline>
    </Svar>
  );
}
