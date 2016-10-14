import React, { PropTypes  } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Artifacts.css';
import Header from '../../components/Header';

function Artifacts() {
  return (
    <div>
      <p> Artifacts </p>
      <Header />
    </div>
  );
}

export default withStyles(s)(Artifacts);
