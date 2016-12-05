import React, { PropTypes  } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';
import cx from 'classnames';
import Login from '../../components/Login';
import ReactRedirect from 'react-redirect';
import cookie from 'react-cookie';

function Home() {

  if(cookie.load('user')){
    return(
      <div><ReactRedirect location='http://localhost:3001/project'></ReactRedirect></div>
    );
  } else {
    return (
      <div >
      <Login />
      </div>
    );
  }
}

export default withStyles(s)(Home);
