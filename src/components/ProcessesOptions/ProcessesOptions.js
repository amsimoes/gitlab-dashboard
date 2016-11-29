import React, { PropTypes  } from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ProcessesOptions.css';
import Link from '../Link';

function ProcessesOptions({ className  }) {
  return (
    <div className={cx(s.root, className)} role="navigation">
    <Link className={cx(s.link, s.highlight, s.list_text)} to="/rup">Effort per Rup category</Link>
    <Link className={cx(s.link, s.highlight, s.list_text)} to="/risk">Risks</Link>
    </div>

  );

}

ProcessesOptions.propTypes = {
  className: PropTypes.string,

};

export default withStyles(s)(ProcessesOptions);
