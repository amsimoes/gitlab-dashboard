import React, { PropTypes  } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Project.css';
import Header from '../../components/Header';

function Project() {
  return (
    <div>
      <Header />
    </div>
  );
}

export default withStyles(s)(Project);
