import React, { PropTypes  } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Processes.css';
import Header from '../../components/Header';
import ProcessesOptions from '../../components/ProcessesOptions';

function Processes() {
  return (
    <div>
      <Header />
    </div>
  );
}

export default withStyles(s)(Processes);
