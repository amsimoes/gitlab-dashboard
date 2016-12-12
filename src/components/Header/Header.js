import React, { PropTypes  } from 'react';
import s from './Header.css';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import UserName from '../UserName';
import ProjectName from '../ProjectName';
import DateTime from '../DateTime';
import Navigation from '../Navigation';
import Link from '../Link';
import Logout from '../Logout';

function Header() {
  return (
    <div className={cx(s.flex, s.justify_center)}>
      <div className={s.style}>
        <div className={s.log}><Logout /></div>
        <UserName /><br/>
        <DateTime />
        <div className={s.container}><ProjectName /></div>
        <Navigation />
      </div>
    </div>
  );
}

export default withStyles(s)(Header);
