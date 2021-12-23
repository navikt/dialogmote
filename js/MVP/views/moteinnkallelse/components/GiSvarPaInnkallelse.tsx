import Tekstomrade from 'nav-frontend-tekstomrade';
import { Feiloppsummering, Radio, RadioGruppe, Textarea } from 'nav-frontend-skjema';
import { Hovedknapp } from 'nav-frontend-knapper';
import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { useSvarPaInnkallelse } from '@/MVP/queries/brev';
import { SvarType } from '@/api/types/brevTypes';
import { AlertStripeAdvarsel, AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Control, Controller, FieldErrors, useForm } from 'react-hook-form';
import { mapErrors } from '@/utils/formUtils';
import { trackOnClick } from '@/amplitude/amplitude';
import { eventNames } from '@/amplitude/events';

const SvarStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border-radius: 4px;
  padding: 2rem;
  background-color: white;
  margin-top: 2rem;
`;

const InlineStyled = styled.div`
  display: inline-flex;
`;

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const texts = {
  info:
    'Det er et krav at du deltar i dialogmøter i løpet av sykefraværet. Passer ikke møtetidspunktet? Be om endring.',
  infoRequired: 'Alle felt er obligatoriske.',
  svarRequired: 'Du må velge et svar',
  svarKommer: 'Jeg kommer',
  svarEndring: 'Jeg ønsker å endre tidspunkt eller sted',
  svarAvlysning: 'Jeg ønsker å avlyse',
  infoEndring: `NAV-kontoret vil vurdere ønsket ditt. Du får et nytt varsel hvis møtet endres. Hvis du ikke får et nytt varsel, er det fortsatt tidspunktet og stedet i denne innkallingen som gjelder.\n\nHusk å begrunne svaret godt slik at NAV-kontoret kan ta beslutningen på et best mulig grunnlag.`,
  infoAvlysning: `NAV-kontoret vil vurdere ønsket ditt. Du får et nytt varsel hvis møtet avlyses. Hvis du ikke får noe nytt varsel, må du fortsatt stille til møtet i denne innkallingen.\n\nSelv om du ønsker å avlyse, kan det hende NAV-kontoret likevel konkluderer med at et møte er nødvendig. Husk å begrunne svaret godt slik at NAV-kontoret kan ta beslutningen på et best mulig grunnlag.`,
  begrunnelseRequired: 'Begrunnelse er obligatorisk',
  begrunnelseMaxLength: 'Begrunnelse kan ikke være lenger enn 300 tegn',
  begrunnelseEndringLabel: 'Hvorfor ønsker du å endre tidspunkt eller sted?',
  begrunnelseAvlysningLabel: 'Hvorfor ønsker du å avlyse?',
  begrunnelseDescription: 'Ikke skriv sensitiv informasjon, for eksempel detaljerte opplysninger om helse.',
  feiloppsummeringTittel: 'For å gå videre må du rette opp følgende:',
  errorMessage: 'Svaret ditt kom ikke frem. Kan du prøve igjen?',
  svarLegend: 'Svar på innkallingen',
};

interface BegrunnelseProps {
  control: Control;
  errors: FieldErrors;
}

const BegrunnelseForEndring = ({ control, errors }: BegrunnelseProps): ReactElement => {
  return (
    <>
      <AlertStripeAdvarsel>
        <Tekstomrade>{texts.infoEndring}</Tekstomrade>
      </AlertStripeAdvarsel>
      <Controller
        name="begrunnelseEndring"
        control={control}
        defaultValue={''}
        rules={{
          required: texts.begrunnelseRequired,
          maxLength: { value: 300, message: texts.begrunnelseMaxLength },
        }}
        render={({ field }) => (
          <Textarea
            id="begrunnelseEndring"
            {...field}
            label={texts.begrunnelseEndringLabel}
            description={texts.begrunnelseDescription}
            maxLength={300}
            feil={errors.begrunnelseEndring?.message}
          />
        )}
      />
    </>
  );
};

const BegrunnelseForAvlysning = ({ control, errors }: BegrunnelseProps): ReactElement => {
  return (
    <>
      <AlertStripeAdvarsel>
        <Tekstomrade>{texts.infoAvlysning}</Tekstomrade>
      </AlertStripeAdvarsel>
      <Controller
        name="begrunnelseAvlysning"
        control={control}
        defaultValue={''}
        rules={{
          required: texts.begrunnelseRequired,
          maxLength: { value: 300, message: texts.begrunnelseMaxLength },
        }}
        render={({ field }) => (
          <Textarea
            id="begrunnelseAvlysning"
            {...field}
            label={texts.begrunnelseAvlysningLabel}
            description={texts.begrunnelseDescription}
            maxLength={300}
            feil={errors.begrunnelseAvlysning?.message}
          />
        )}
      />
    </>
  );
};

interface Props {
  brevUuid: string;
}

const GiSvarPaInnkallelse = ({ brevUuid }: Props): ReactElement => {
  const svarPaInnkallelse = useSvarPaInnkallelse(brevUuid);
  const { register, watch, formState, handleSubmit, getValues, control } = useForm();
  const { errors } = formState;
  const watchSvar = watch('svar', false);

  const sendSvar = (): void => {
    const selectedSvar = getValues('svar');
    if (selectedSvar) {
      const svar = {
        svarType: selectedSvar,
        ...begrunnelse(selectedSvar),
      };
      console.log(svar);
      svarPaInnkallelse.mutate(svar);
    }
  };

  const begrunnelse = (selectedSvar: SvarType): { svarTekst: string } | undefined => {
    switch (selectedSvar) {
      case 'NYTT_TID_STED':
        return { svarTekst: getValues('begrunnelseEndring') };
      case 'KOMMER_IKKE':
        return { svarTekst: getValues('begrunnelseAvlysning') };
    }
    return undefined;
  };

  const radio = register('svar', { required: texts.svarRequired });

  const feil = mapErrors(errors);

  return (
    <SvarStyled>
      <Tekstomrade>{texts.info}</Tekstomrade>
      <Tekstomrade>{texts.infoRequired}</Tekstomrade>
      <FormStyled onSubmit={handleSubmit(sendSvar)}>
        <RadioGruppe legend={texts.svarLegend} feil={errors.svar?.message}>
          <Radio
            label={texts.svarKommer}
            name={radio.name}
            value={'KOMMER'}
            radioRef={radio.ref}
            onChange={radio.onChange}
            onBlur={radio.onBlur}
          />
          <Radio
            label={texts.svarEndring}
            name={radio.name}
            value={'NYTT_TID_STED'}
            radioRef={radio.ref}
            onChange={radio.onChange}
            onBlur={radio.onBlur}
          />
          <Radio
            label={texts.svarAvlysning}
            name={radio.name}
            value={'KOMMER_IKKE'}
            radioRef={radio.ref}
            onChange={radio.onChange}
            onBlur={radio.onBlur}
          />
        </RadioGruppe>

        {watchSvar == 'NYTT_TID_STED' && <BegrunnelseForEndring control={control} errors={errors} />}
        {watchSvar == 'KOMMER_IKKE' && <BegrunnelseForAvlysning control={control} errors={errors} />}

        {!!feil.length && <Feiloppsummering tittel={texts.feiloppsummeringTittel} feil={feil} />}

        {svarPaInnkallelse.isError && <AlertStripeFeil>{texts.errorMessage}</AlertStripeFeil>}

        <InlineStyled>
          <Hovedknapp
            disabled={svarPaInnkallelse.isLoading}
            spinner={svarPaInnkallelse.isLoading}
            onClick={() => trackOnClick(eventNames.sendSvarPaInnkallelse)}
          >
            Send svar
          </Hovedknapp>
        </InlineStyled>
      </FormStyled>
    </SvarStyled>
  );
};

export default GiSvarPaInnkallelse;
