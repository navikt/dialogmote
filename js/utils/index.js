import PropTypes from 'prop-types';
import { childEllerChildren } from '../propTypes';

export const lagDesimaltall = (streng) => {
  let s = streng.replace(/,/g, '.');
  if (s.startsWith('.')) {
    return '';
  }
  if (!s.endsWith('.')) {
    s = parseFloat(s);
    if (Number.isNaN(s)) {
      return '';
    }
  }
  s = `${s}`.replace(/\./g, ',');
  if (s.indexOf(',') > -1) {
    s = s.split(',');
    s = [s[0], s[1].substr(0, 2)];
    return s.join(',');
  }
  return s;
};

export function getCookie(name) {
  const re = new RegExp(`${name}=([^;]+)`);
  const match = re.exec(document.cookie);
  return match !== null ? match[1] : '';
}

export const lagHeltall = (streng) => {
  const strengMedDesimaler = lagDesimaltall(streng);
  return strengMedDesimaler.split(',')[0];
};

export const Vis = ({ hvis, children, render }) => {
  return hvis && render ? render() : hvis && children ? children : null;
};

Vis.propTypes = {
  hvis: PropTypes.bool,
  children: childEllerChildren,
};
