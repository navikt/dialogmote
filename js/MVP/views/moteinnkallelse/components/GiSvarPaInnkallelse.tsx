import Tekstomrade from 'nav-frontend-tekstomrade';
import { Feiloppsummering, Radio, RadioGruppe, Textarea } from 'nav-frontend-skjema';
import { Hovedknapp } from 'nav-frontend-knapper';
import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { useSvarPaInnkallelse } from '@/MVP/queries/brev';
import { SvarType } from '@/api/types/brevTypes';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { useForm } from 'react-hook-form';
import { mapErrors } from '@/utils/formUtils';

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
  const [begrunnelseEndring, setBegrunnelseEndring] = useState<string>('');
  const [begrunnelseAvlysning, setBegrunnelseAvlysning] = useState<string>('');
  const { register, watch, formState, handleSubmit, getValues } = useForm();
  const { errors } = formState;
  const watchSvar = watch('svar', false);

  const sendSvar = (): void => {
    const selectedSvar = getValues('svar');
    if (selectedSvar) {
      const svar = {
        svarType: selectedSvar,
        ...begrunnelse(selectedSvar),
      };
      svarPaInnkallelse.mutate(svar);
    }
  };

  const begrunnelse = (selectedSvar: SvarType): { svarTekst: string } | undefined => {
    switch (selectedSvar) {
      case 'NYTT_TID_STED':
        return { svarTekst: begrunnelseEndring };
      case 'KOMMER_IKKE':
        return { svarTekst: begrunnelseAvlysning };
    }
    return undefined;
  };

  const radio = register('svar', { required: 'Du må velge et svar' });

  const feil = mapErrors(errors);

  return (
    <Svar>
      <Tekstomrade>
        Det er et krav at du deltar i dialogmøter i løpet av sykefraværet. Passer ikke møtetidspunktet? Be om endring.
      </Tekstomrade>
      <Tekstomrade>Alle felt er obligatoriske.</Tekstomrade>
      <form onSubmit={handleSubmit(sendSvar)}>
        <RadioGruppe legend="Svar på innkallingen" feil={errors.svar?.message}>
          <Radio
            label={'Jeg kommer'}
            name={radio.name}
            value={'KOMMER'}
            radioRef={radio.ref}
            onChange={radio.onChange}
            onBlur={radio.onBlur}
          />
          <Radio
            label={'Jeg ønsker å endre tidspunkt eller sted'}
            name={radio.name}
            value={'NYTT_TID_STED'}
            radioRef={radio.ref}
            onChange={radio.onChange}
            onBlur={radio.onBlur}
          />
          <Radio
            label={'Jeg ønsker å avlyse'}
            name={radio.name}
            value={'KOMMER_IKKE'}
            radioRef={radio.ref}
            onChange={radio.onChange}
            onBlur={radio.onBlur}
          />
        </RadioGruppe>
        {watchSvar == 'NYTT_TID_STED' && (
          <BegrunnelseForEndring onChange={(event) => setBegrunnelseEndring(event)} value={begrunnelseEndring} />
        )}
        {watchSvar == 'KOMMER_IKKE' && (
          <BegrunnelseForAvlysning onChange={(event) => setBegrunnelseAvlysning(event)} value={begrunnelseAvlysning} />
        )}
        {!!feil.length && <Feiloppsummering tittel="For å gå videre må du rette opp følgende:" feil={feil} />}
        <Inline>
          <Hovedknapp>Send svar</Hovedknapp>
        </Inline>
      </form>
    </Svar>
  );
};
