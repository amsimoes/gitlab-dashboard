import React, { PropTypes  } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Work.css';
import Header from '../../components/Header';

function Work() {
  return (
    <div>
      <p> Work </p>
      <Header />
    </div>
  );
}

export default withStyles(s)(Work);
