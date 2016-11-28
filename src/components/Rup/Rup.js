import React, { Component, PropTypes } from 'react';
import * as axios from 'axios';
import ReactRedirect from 'react-redirect';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';

class Rup extends Component {

  componentWillMount = () => {
    axios.get('http://localhost:5000/processes')
      .then(function(response){
        console.log("123");
      }.bind(this))
      .catch(function(error){
        console.log(error);
      });
  }

  render() {
    return(
      <ReactRedirect location='http://localhost:8000/effortTimeline.html'></ReactRedirect>
    );
  }
}

export default Rup
