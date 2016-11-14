import React, { Component, PropTypes } from 'react';
import * as axios from 'axios';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './UserName.css';
import cx from 'classnames';

class UserName extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
  }

  render() {
    return(
      <div>
        <div className={s.line_text}><p className={s.line_text_p}>Current username is Pedro Caseiro</p></div>
      </div>
    );
  }
}


export default withStyles(s)(UserName);
