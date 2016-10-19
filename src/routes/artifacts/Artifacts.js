import React, { PropTypes  } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Artifacts.css';
import Header from '../../components/Header';
import ListProjectFiles from '../../components/ListProjectFiles';
function Artifacts() {
  return (
    <div>
      <Header />
      <ListProjectFiles />
    </div>
  );
}

export default withStyles(s)(Artifacts);
