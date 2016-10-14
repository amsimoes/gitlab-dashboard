import React, { PropTypes  } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import UserName from '../UserName';
import ProjectName from '../ProjectName';
import DateTime from '../DateTime';
import Navigation from '../Navigation';
import Link from '../Link';

function Header() {
  return (
    <div classname={s.root}>
      <div className={s.container}>
        <ProjectName />
        <UserName />
        <DateTime />
        <Navigation className={s.nav}/>
      </div>
    </div>
  );
}

export default withStyles(s)(Header);
