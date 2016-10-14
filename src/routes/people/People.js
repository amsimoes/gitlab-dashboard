import React, { PropTypes  } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './People.css';
import Header from '../../components/Header';

function People() {
  return (
    <div>
      <p> People </p>
      <Header />
    </div>
  );
}

export default withStyles(s)(People);
