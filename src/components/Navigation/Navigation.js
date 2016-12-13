import React, { PropTypes  } from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.css';
import Link from '../Link';
import ProcessesOptions from '../ProcessesOptions'

function Navigation({ className  }) {
  return (
    <div className={cx(s.root, className)} role="navigation">
    <Link className={cx(s.link, s.highlight, s.list_text)} to="/project">Project</Link>
    <Link className={cx(s.link, s.highlight, s.list_text)} to="/work">Work</Link>
    <Link className={cx(s.link, s.highlight, s.list_text)} to="/artifacts">Artifacts</Link>
    <ProcessesOptions className={cx(s.link, s.highlight, s.list_text, s.exception)}></ProcessesOptions>
    <Link className={cx(s.link, s.highlight, s.list_text)} to="/people">People</Link>
    </div>

  );

}

Navigation.propTypes = {
  className: PropTypes.string,

};

export default withStyles(s)(Navigation);
