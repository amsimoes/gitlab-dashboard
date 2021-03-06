import React, { Component, PropTypes } from 'react';
import * as axios from 'axios';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ProjectName.css';
import cx from 'classnames';
import Link from '../Link';
import cookie from 'react-cookie'

var Loading = require('react-loading');

class ProjectName extends Component {

  constructor(props) {
    super(props);
    this.state = {
      projectName: '',
    };
  }

  componentWillMount = () => {
    console.log(cookie.load('index'));
    axios.post('http://localhost:5000/project_name',{
      token: cookie.load('token'),
      index: cookie.load('index')
    })
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
          <Link className={s.main_title} to='/project'>{this.state.projectName}</Link>
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
