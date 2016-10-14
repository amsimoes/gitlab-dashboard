import React, { Component, PropTypes } from 'react';
import Time from 'react-time'

class DateTime extends Component {

  render() {
    let now = new Date()
    return (
      <div>
      <p>Today is <Time value={now} titleFormat="YYYY/MM/DD HH:mm" /></p>
      </div>

    )

  }

}

export default DateTime

