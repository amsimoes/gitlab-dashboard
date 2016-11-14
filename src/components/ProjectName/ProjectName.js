import React, { Component, PropTypes } from 'react';
import * as axios from 'axios';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ProjectName.css';
import cx from 'classnames';

var Loading = require('react-loading');

class ProjectName extends Component {

  constructor(props) {
    super(props);
    this.state = {
      projectName: '',
    };
  }

  componentWillMount = () => {

    axios.get('http://localhost:5000/projects')
      .then(function (response) {
        this.setState({projectName: response.data});
      }.bind(this))
      .catch(function (error) {
        console.log(error);

      });
  }

  render() {
    if(this.state.projectName){
      return(
        <div>
          <div className={s.main_title}>{this.state.projectName}</div>
        </div>
      );
    } else {
      return(
        <div className={s.loading_style}><Loading type='bubbles' color='#e3e3e3' /></div>
      )
    }
  }
}

export default withStyles(s)(ProjectName);
