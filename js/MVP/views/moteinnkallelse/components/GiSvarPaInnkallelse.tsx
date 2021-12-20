import Tekstomrade from 'nav-frontend-tekstomrade';
import { Radio, RadioGruppe, Textarea } from 'nav-frontend-skjema';
import { Hovedknapp } from 'nav-frontend-knapper';
import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { useSvarPaInnkallelse } from '@/MVP/queries/brev';
import { SvarType } from '@/api/types/brevTypes';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';

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

interface BegrunnelseProps {
  onChange: (text: string) => void;
  value: string;
}

const BegrunnelseForEndring = ({ onChange, value }: BegrunnelseProps): ReactElement => {
  return (
    <>
      <AlertStripeAdvarsel>
        <Tekstomrade>
          {`NAV-kontoret vil vurdere ønsket ditt. Du får et nytt varsel hvis møtet endres. Hvis du ikke får et nytt varsel, er det fortsatt tidspunktet og stedet i denne innkallingen som gjelder.

            Husk å begrunne svaret godt slik at NAV-kontoret kan ta beslutningen på et best mulig grunnlag.`}
        </Tekstomrade>
      </AlertStripeAdvarsel>
      <Textarea
        label="Hvorfor ønsker du å endre tidspunkt eller sted?"
        description="Ikke skriv sensitiv informasjon, for eksempel detaljerte opplysninger om helse."
        maxLength={300}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </>
  );
};

const BegrunnelseForAvlysning = ({ onChange, value }: BegrunnelseProps): ReactElement => {
  return (
    <>
      <AlertStripeAdvarsel>
        <Tekstomrade>
          {`NAV-kontoret vil vurdere ønsket ditt. Du får et nytt varsel hvis møtet avlyses. Hvis du ikke får noe nytt varsel, må du fortsatt stille til møtet i denne innkallingen.  

            Selv om du ønsker å avlyse, kan det hende NAV-kontoret likevel konkluderer med at et møte er nødvendig. Husk å begrunne svaret godt slik at NAV-kontoret kan ta beslutningen på et best mulig grunnlag.`}
        </Tekstomrade>
      </AlertStripeAdvarsel>
      <Textarea
        label="Hvorfor ønsker du å avlyse?"
        description="Ikke skriv sensitiv informasjon, for eksempel detaljerte opplysninger om helse."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        maxLength={300}
      />
    </>
  );
};

export const GiSvarPaInnkallelse = ({ brevUuid }: Props): ReactElement => {
  const svarPaInnkallelse = useSvarPaInnkallelse(brevUuid);
  const [selectedSvar, setSelectedSvar] = useState<SvarType>();
  const [begrunnelseEndring, setBegrunnelseEndring] = useState<string>('');
  const [begrunnelseAvlysning, setBegrunnelseAvlysning] = useState<string>('');

  const sendSvar = (): void => {
    if (selectedSvar) {
      const svar = {
        svarType: selectedSvar,
        ...begrunnelse(),
      };
      svarPaInnkallelse.mutate(svar);
    }
  };

  const begrunnelse = (): { svarTekst: string } | undefined => {
      switch (selectedSvar) {
          case 'NYTT_TID_STED':
              return { svarTekst: begrunnelseEndring }
          case 'KOMMER_IKKE':
              return { svarTekst: begrunnelseAvlysning}
      }
    return undefined;
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
      {selectedSvar == 'NYTT_TID_STED' && (
        <BegrunnelseForEndring onChange={(event) => setBegrunnelseEndring(event)} value={begrunnelseEndring} />
      )}
      {selectedSvar == 'KOMMER_IKKE' && (
        <BegrunnelseForAvlysning onChange={(event) => setBegrunnelseAvlysning(event)} value={begrunnelseAvlysning} />
      )}
      <Inline>
        <Hovedknapp onClick={sendSvar}>Send svar</Hovedknapp>
      </Inline>
    </Svar>
  );
};
