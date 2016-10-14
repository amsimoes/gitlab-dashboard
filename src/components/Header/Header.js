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
    <div>
      <ProjectName />
      <UserName />
      <DateTime />
      <Navigation className={s.nav}/>
      <Link className={s.brand} to="/">
        <span className={s.brandTxt}>Your Company</span>
      </Link>
    </div>

  );

}

export default withStyles(s)(Header);
