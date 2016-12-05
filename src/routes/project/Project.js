import React, { PropTypes  } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Project.css';
import Header from '../../components/Header';
import Commits from '../../components/Commits';
import CommitsGraph from '../../components/CommitsGraph';
import cookie from 'react-cookie';

function Project() {

  console.log(cookie.load('user'));

  return (
    <div>
      <Header />
      <CommitsGraph />
      <Commits />
    </div>
  );
}

export default withStyles(s)(Project);
