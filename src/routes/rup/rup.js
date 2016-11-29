import React, { PropTypes  } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import Header from '../../components/Header';
import s from './rup.css'
import ReactRedirect from 'react-redirect';

function Rup() {
  return (
    <div >
      <ReactRedirect location='http://localhost:8000/effortTimeline.html'></ReactRedirect>
    </div>
  );
}

export default withStyles(s)(Rup);
