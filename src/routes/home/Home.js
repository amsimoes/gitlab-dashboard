import React, { PropTypes  } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';
//import ProjectName from '../../components/ProjectName';
//import DateTime from '../../components/DateTime';
//import UserName from '../../components/UserName';
import Header from '../../components/Header';

function Home() {
  return (
    <div>
      <Header />
    </div>
  );
}

export default withStyles(s)(Home);
