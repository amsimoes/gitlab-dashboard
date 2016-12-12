import React, { PropTypes  } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './InitialPage.css';
import cx from 'classnames';
import GetProjects from '../../components/GetProjects';
import ReactRedirect from 'react-redirect';
import cookie from 'react-cookie';

function InitialPage() {
  return (
    <div>
      <GetProjects />
    </div>

  );

} 

export default withStyles(s)(InitialPage);
