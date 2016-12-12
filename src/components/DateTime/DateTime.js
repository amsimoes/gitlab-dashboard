import React, { Component, PropTypes } from 'react';
import Time from 'react-time';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './DateTime.css';
import cx from 'classnames';

var Clock = require('react-clock');
class DateTime extends Component {
  render() {
    let now = new Date()
    return (
      <div className={s.line_text}>
        <p className={s.line_text_p}><Time value={now} format="YYYY/MM/DD"/></p>
        <Clock className={s.line_text}/>
        <p className={s.line_text_p}>Week 14</p>
      </div>

    )
  }
}


export default withStyles(s)(DateTime);
