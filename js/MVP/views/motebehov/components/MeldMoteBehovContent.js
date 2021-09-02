import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Checkbox, Textarea, Feiloppsummering } from 'nav-frontend-skjema';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFeiloppsumeringList } from '../../../hooks/motebehov';
import DialogmotePanel from '../../../containers/DialogmotePanel';
import { postMeldMotebehovSchema } from '../../../schemas/motebehov';
import FormButtons from './FormButtons';

const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
`;

const DialogmotePanelStyled = styled(DialogmotePanel)`
  margin-bottom: 16px;
`;

const FeiloppsummeringStyled = styled(Feiloppsummering)`
  margin-top: 32px;
`;

const texts = {
  paragraph: 'Alle felt må fylles ut, bortsett fra de som er markert som valgfrie.',
  checkbox1: 'Jeg har behov for et møte med NAV.',
  checkbox2: 'Jeg ønsker at den som sykmelder meg, også skal delta i møtet.',
  textAreaLabel: 'Begrunnelse (valgfritt)',
  textAreaDescription: 'Ikke skriv sensitiv informasjon, for eksempel detaljerte opplysninger om helsen din.',
};

const fields = {
  MOTEBEHOV_CHECKBOX: 'motebehovCheckbox',
  SYKEMELDER_CHECKBOX: 'sykemelderCheckbox',
  BEGRUNN_TEXTAREA: 'begrunnTextarea',
};

const MAX_LENGTH = 1000;

const MeldMoteBehovContent = () => {
  const [textInput, setTextInput] = useState('');
  const { register, handleSubmit, formState, control, setValue } = useForm({
    resolver: zodResolver(postMeldMotebehovSchema(MAX_LENGTH)),
  });

  const feiloppsummeringList = useFeiloppsumeringList(formState);

  const { errors } = formState;

  useEffect(() => {
    setValue(fields.BEGRUNN_TEXTAREA, textInput, { shouldValidate: true });
  }, [textInput]);

  return (
    <React.Fragment>
      <p>{texts.paragraph}</p>
      <DialogmotePanelStyled>
        {/* eslint-disable-next-line no-console */}
        <form onSubmit={handleSubmit((d) => console.log(d))}>
          <CheckboxWrapper>
            <Controller
              name={fields.MOTEBEHOV_CHECKBOX}
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <Checkbox
                  {...field}
                  label={texts.checkbox1}
                  id={fields.MOTEBEHOV_CHECKBOX}
                  feil={errors[fields.MOTEBEHOV_CHECKBOX] && errors[fields.MOTEBEHOV_CHECKBOX].message}
                />
              )}
            />
            <Controller
              name={fields.SYKEMELDER_CHECKBOX}
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <Checkbox
                  {...field}
                  label={texts.checkbox2}
                  id={fields.SYKEMELDER_CHECKBOX}
                  feil={errors[fields.SYKEMELDER_CHECKBOX] && errors[fields.SYKEMELDER_CHECKBOX].message}
                />
              )}
            />
          </CheckboxWrapper>

          <Textarea
            {...register(fields.BEGRUNN_TEXTAREA)}
            id={fields.BEGRUNN_TEXTAREA}
            label={texts.textAreaLabel}
            description={texts.textAreaDescription}
            maxLength={MAX_LENGTH}
            value={textInput}
            onChange={(e) => {
              setTextInput(e.target.value);
            }}
            feil={errors[fields.BEGRUNN_TEXTAREA] && errors[fields.BEGRUNN_TEXTAREA].message}
          />

          {feiloppsummeringList.length > 0 && (
            <FeiloppsummeringStyled tittel="For å gå videre må du rette opp følgende:" feil={feiloppsummeringList} />
          )}
          <FormButtons />
        </form>
      </DialogmotePanelStyled>
    </React.Fragment>
  );
};

MeldMoteBehovContent.propTypes = {};

export default MeldMoteBehovContent;
