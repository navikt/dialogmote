import React, { ReactElement } from 'react';
import { Element, Innholdstittel, Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import { trackOnClick } from '@/amplitude/amplitude';
import { eventNames } from '@/amplitude/events';
import { DocumentComponent } from '@/api/types/brevTypes';

const DocumentTypes = {
  HEADER: 'HEADER', // legacy
  HEADER_H1: 'HEADER_H1',
  HEADER_H2: 'HEADER_H2',
  PARAGRAPH: 'PARAGRAPH',
  LINK: 'LINK',
};

interface Props {
  documentComponent: DocumentComponent;
}

const DocumentRenderer = ({ documentComponent }: Props): ReactElement | null => {
  const { type, title, texts } = documentComponent;

  switch (type) {
    case DocumentTypes.HEADER:
      return (
        <>
          {texts.map((text, index) => (
            <Innholdstittel key={index} tag="h2">
              {text}
            </Innholdstittel>
          ))}
        </>
      );

    case DocumentTypes.HEADER_H1:
      return (
        <>
          {texts.map((text, index) => (
            <Sidetittel key={index}>{text}</Sidetittel>
          ))}
        </>
      );

    case DocumentTypes.HEADER_H2:
      return (
        <>
          {texts.map((text, index) => (
            <Innholdstittel key={index} tag="h2">
              {text}
            </Innholdstittel>
          ))}
        </>
      );

    case DocumentTypes.LINK:
      return (
        <>
          {title && <Element>{title}</Element>}
          {texts.map((text, index) => (
            <Lenke
              key={index}
              href={text}
              onClick={() => trackOnClick(eventNames.documentRendererLink, { linkType: text })}
            >
              {text}
            </Lenke>
          ))}
        </>
      );

    case DocumentTypes.PARAGRAPH:
      return (
        <>
          {title && <Element>{title}</Element>}
          {texts.map((text, index) => (
            <Normaltekst key={index}>{text}</Normaltekst>
          ))}
        </>
      );

    default:
      return null;
  }
};

export default DocumentRenderer;
