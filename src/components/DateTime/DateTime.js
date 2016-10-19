import React, { Component, PropTypes } from 'react';
import Time from 'react-time';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './DateTime.css';
import cx from 'classnames';

class DateTime extends Component {

  render() {
    let now = new Date()
    return (
      <div  className={s.line_text}>
      <p>Today is <Time value={now} titleFormat="YYYY/MM/DD HH:mm" /></p>
      </div>

    )

  }

}

export default withStyles(s)(DateTime);
