import React from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import PropTypes from 'prop-types';
import { UndertekstBold } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import styled from 'styled-components';
import { infoUrls } from '../data';

const AlertStripeStyled = styled(AlertStripeInfo)`
  margin-top: 32px;
`;

const SectionStyled = styled.section`
  padding-left: 8px;
`;

const texts = {
  title: 'Du kan finne mer informasjon på nav.no:',
};

const ListUrls = ({ links }) => {
  const linkKeys = Object.keys(infoUrls);
  const linkSet = [...new Set(links)];
  const validLinks = linkSet.filter((link) => linkKeys.includes(link));

  if (links.length === 0) {
    return null;
  }

  return (
    <SectionStyled>
      {validLinks.map((link) => {
        const { text, url } = infoUrls[link];

        return (
          <li key={link}>
            <Lenke href={url}>{text}</Lenke>
          </li>
        );
      })}
    </SectionStyled>
  );
};

ListUrls.propTypes = { links: PropTypes.arrayOf(PropTypes.string) };

const LinkInfoBox = ({ links = ['AVKLARING_ARBEIDSEVNE', 'FRISKMELDING_ARBEIDSFORMIDLING'] }) => {
  return (
    <AlertStripeStyled>
      <UndertekstBold>{texts.title}</UndertekstBold>
      <ListUrls links={links} />
    </AlertStripeStyled>
  );
};

LinkInfoBox.propTypes = { links: PropTypes.arrayOf(PropTypes.string) };

export default LinkInfoBox;
