import React, { PropTypes  } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Work.css';
import Header from '../../components/Header';
import AllCommits from '../../components/AllCommits';
function Work() {
  return (
    <div>
      <Header />
      <AllCommits />
    </div>
  );
}

export default withStyles(s)(Work);
