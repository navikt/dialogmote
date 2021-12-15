import Tekstomrade from 'nav-frontend-tekstomrade';
import { Radio, RadioGruppe } from 'nav-frontend-skjema';
import { Hovedknapp } from 'nav-frontend-knapper';
import React from 'react';
import styled from "styled-components";

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

export function GiSvarPaInnkallelse() {
  return (
    <Svar>
      <Tekstomrade>
        Det er et krav at du deltar i dialogmøter i løpet av sykefraværet. Passer ikke møtetidspunktet? Be om endring.
      </Tekstomrade>
      <Tekstomrade>Alle felt er obligatoriske.</Tekstomrade>
      <RadioGruppe legend="Svar på innkallingen">
        <Radio label={'Jeg kommer'} name="svar" />
        <Radio label={'Jeg ønsker å endre tidspunkt eller sted'} name="svar" />
        <Radio label={'Jeg ønsker å avlyse'} name="svar" />
      </RadioGruppe>
      <Inline>
        <Hovedknapp>Send svar</Hovedknapp>
      </Inline>
    </Svar>
  );
}