export type DocumentComponentType = 'HEADER' | 'PARAGRAPH' | 'LINK';

export type SvarType = 'KOMMER' | 'NYTT_TID_STED' | 'KOMMER_IKKE';

export interface Brev {
  uuid: string;
  deltakerUuid: string;
  createdAt: string;
  brevType: string;
  digitalt: boolean;
  lestDato?: string;
  fritekst: string;
  sted: string;
  tid: string;
  videoLink?: string;
  document: DocumentComponent[];
  virksomhetsnummer: string;
  svarType?: SvarType;
  svarTekst?: string;
  svarTidspunkt?: string;
}

export type DocumentComponent = {
  type: DocumentComponentType;
  title?: string;
  texts: string[];
};
