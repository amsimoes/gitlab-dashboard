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
import Toast from '../Toast';

function Header() {
  return (
    <div className={cx(s.flex, s.justify_center)}>
      <div className={s.style}>
        <div className={s.log}><UserName /><Logout /></div>
        <br/>
        <div className={s.margin}><DateTime /></div>
        <a href="http://localhost:3001/initialPage">
        <img src="http://i.imgur.com/qA0mNgf.png"/>
        </a>
        <div className={s.container}><ProjectName /></div>
        <Navigation />
        <Toast />
      </div>
    </div>
  );
}

export default withStyles(s)(Header);
