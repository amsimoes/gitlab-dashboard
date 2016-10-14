import React, { PropTypes  } from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.css';
import Link from '../Link';

function Navigation({ className  }) {
  return (
    <div className={cx(s.root, className)} role="navigation">
      <Link className={s.link} to="/project">Project</Link>
      <Link className={s.link} to="/work">Work</Link>
      <Link className={s.link} to="/artifacts">Artifacts</Link>
      <Link className={s.link} to="/processes">Processes</Link>
      <Link className={s.link} to="/people">People</Link>
    </div>

  );

}

Navigation.propTypes = {
  className: PropTypes.string,

};

export default withStyles(s)(Navigation);
