import React, { PropTypes  } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './People.css';
import Header from '../../components/Header';
import ProjectMembers from '../../components/ProjectMembers';
function People() {
  return (
    <div>
      <Header />
      <ProjectMembers />
    </div>
  );
}

export default withStyles(s)(People);
