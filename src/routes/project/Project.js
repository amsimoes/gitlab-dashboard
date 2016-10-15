import React, { PropTypes  } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Project.css';
import Header from '../../components/Header';
import Commits from '../../components/Commits';

function Project() {
  return (
    <div>
      <p> Project </p>
      <Header />
      <Commits />
    </div>
  );
}

export default withStyles(s)(Project);
