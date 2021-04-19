import PropTypes from 'prop-types';

export * from './dialogmoteProptypes';

export const brodsmule = PropTypes.shape({
  sti: PropTypes.string,
  tittel: PropTypes.string,
  sisteSmule: PropTypes.bool,
  erKlikkbar: PropTypes.bool,
});

const meta = PropTypes.shape({
  error: PropTypes.string,
  touched: PropTypes.bool,
});

const input = PropTypes.shape({
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onDragStart: PropTypes.func,
  onDrop: PropTypes.func,
  onFocus: PropTypes.func,
});

export const fieldPropTypes = { meta, input };

export const childEllerChildren = PropTypes.node;

export const sykeforloepPt = PropTypes.shape({
  data: PropTypes.array,
  henter: PropTypes.bool,
  hentet: PropTypes.bool,
  hentingFeilet: PropTypes.bool,
});
