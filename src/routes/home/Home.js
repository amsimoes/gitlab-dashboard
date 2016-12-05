import React, { PropTypes  } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';
import cx from 'classnames';
import Login from '../../components/Login';

function Home() {
  return (
    <div >
      <Login />
    </div>
  );
}

export default withStyles(s)(Home);
