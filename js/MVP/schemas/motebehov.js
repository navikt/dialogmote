import { z } from 'zod';

export const postMeldMotebehovSchema = (maxLength) => {
  return z.object({
    motebehovCheckbox: z.boolean().refine((val) => val, 'Du må velge alternativet'),
    sykemelderCheckbox: z.boolean(),
    begrunnTextarea: z
      .string()
      .max(maxLength, `Du må ha maks ${maxLength} tegn`)
      .refine((val) => !val.match(new RegExp('.*<[^ ][^>]+[^ ]>.*')), 'Du må ikke bruke html-tags, < og >')
      .optional(),
  });
};
