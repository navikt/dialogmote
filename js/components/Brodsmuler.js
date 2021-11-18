import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { brodsmule as brodsmuleProptype } from '../propTypes';
import { PersonImage } from '@/images/imageComponents';
import { LANDING_URL } from '@/MVP/globals/paths';
import { Link } from 'react-router';
import Lenke from 'nav-frontend-lenker';

const Brodsmule = ({ sti, tittel, sisteSmule, erKlikkbar }) => {
  const isInternalLink = sti && sti.indexOf(LANDING_URL) > -1;
  const link = isInternalLink ? (
    <Link className="js-smule brodsmuler__smule" to={sti}>
      {tittel}
    </Link>
  ) : (
    <Lenke className="js-smule js-smule-a brodsmuler__smule" href={sti}>
      {tittel}
    </Lenke>
  );

  if (sisteSmule) {
    return (
      <span className="js-smuletekst">
        <span className="vekk">Du er her:</span> <span className="brodsmule">{tittel}</span>
      </span>
    );
  }
  if (erKlikkbar) {
    return (
      <span className="js-smuletekst">
        {link}
        <span className="brodsmule__skille"> / </span>
      </span>
    );
  }
  return (
    <span>
      <span className="brodsmuler__smule">{tittel}</span>
      <span className="brodsmule__skille"> / </span>
    </span>
  );
};

Brodsmule.propTypes = {
  sti: PropTypes.string,
  tittel: PropTypes.string,
  sisteSmule: PropTypes.bool,
  erKlikkbar: PropTypes.bool,
};

const ToggleLink = ({ onClick }) => {
  return (
    <span>
      <a
        role="button"
        aria-label="Vis hele brødsmulestien"
        className="js-toggle brodsmuler__smule"
        href="#"
        onClick={onClick}
      >
        ...
      </a>
      <span className="brodsmule__skille"> / </span>
    </span>
  );
};

ToggleLink.propTypes = {
  onClick: PropTypes.func,
};

class Brodsmuler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visCollapsed: true,
    };
  }

  getSynligeBrodsmuler() {
    const { brodsmuler } = this.props;
    if (this.visCollapsed()) {
      return [brodsmuler[brodsmuler.length - 2], brodsmuler[brodsmuler.length - 1]];
    }
    return brodsmuler;
  }

  visCollapsed() {
    const { brodsmuler } = this.props;
    const { visCollapsed } = this.state;
    return brodsmuler.length > 3 && visCollapsed;
  }

  visAlleBrodsmuler() {
    this.setState({
      visCollapsed: false,
    });
  }

  render() {
    const { brodsmuler } = this.props;
    const synligeBrodsmuler = this.getSynligeBrodsmuler();
    return (
      <nav className="brodsmuler" aria-label="Du er her: ">
        <img src={PersonImage} alt="Du" className="brodsmuler__ikon" />
        <div className="brodsmuler__smuler">
          <a href="/dittnav" className="js-smule brodsmuler__smule">
            Ditt NAV
          </a>
          {brodsmuler.length > 0 && <span className="brodsmule__skille"> / </span>}
          {this.visCollapsed() && (
            <ToggleLink
              onClick={(e) => {
                e.preventDefault();
                this.visAlleBrodsmuler();
              }}
            />
          )}
          {synligeBrodsmuler
            .map((smule, index) => {
              return {
                ...smule,
                sisteSmule: synligeBrodsmuler.length === index + 1,
              };
            })
            .map((smule, index) => {
              return <Brodsmule key={index} {...smule} />;
            })}
        </div>
      </nav>
    );
  }
}

Brodsmuler.propTypes = {
  brodsmuler: PropTypes.arrayOf(brodsmuleProptype),
};

export default Brodsmuler;
