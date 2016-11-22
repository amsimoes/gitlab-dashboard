import React, { PropTypes  } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Processes.css';
import Header from '../../components/Header';
import Rup from '../../components/Rup';

function Processes() {
  return (
    <div>
      <Header />
      <Rup />
    </div>
  );
}

export default withStyles(s)(Processes);
