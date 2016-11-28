import React, { Component, PropTypes } from 'react';
import * as axios from 'axios';
import ReactRedirect from 'react-redirect';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';

class Rup extends Component {

  render() {
    return(
      <ReactRedirect location='http://localhost:8000/effortTimeline.html'></ReactRedirect>
    );
  }
}

export default Rup
