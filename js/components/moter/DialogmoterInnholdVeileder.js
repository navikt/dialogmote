import React from 'react';
import Veileder from 'nav-frontend-veileder';
import styled from 'styled-components';
import VeilederSvg from './VeilederSvg';

const VeilederStyled = styled(Veileder)`
  margin-bottom: 1rem;
  .nav-veileder__snakkeboblePil {
    border-right: 1.25rem solid white;
  }
  .nav-veileder__snakkeboble {
    background: white;
  }
`;

const texts = {
  paragraph: `
    I et dialogmøte går vi gjennom situasjonen og planlegger veien videre.
    De som deltar, er du, lederen din og en veileder fra NAV-kontoret, eventuelt også den som sykmelder deg.
    `,
  link: 'Les mer om dialogmøter',
};

const DialogmoterInnholdVeilederText = () => {
  return (
    <React.Fragment>
      {texts.paragraph}
      <br />
      <a
        className="lenke"
        href="https://www.nav.no/no/bedrift/oppfolging/sykmeldt-arbeidstaker/relatert-informasjon/slik-folger-du-opp-sykmeldte/dialogmote-2-og-3-nav_kap"
      >
        {texts.link}
      </a>
    </React.Fragment>
  );
};

const DialogmoterInnholdVeileder = () => {
  return (
    <VeilederStyled className="dialogmoterInnholdVeileder" tekst={<DialogmoterInnholdVeilederText />} posisjon="høyre">
      <VeilederSvg />
    </VeilederStyled>
  );
};

export default DialogmoterInnholdVeileder;
