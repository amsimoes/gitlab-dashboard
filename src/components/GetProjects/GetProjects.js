import React, { Component, PropTypes } from 'react';
import * as axios from 'axios';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './GetProjects.css';
import cx from 'classnames';
import Link from '../Link';
import cookie from 'react-cookie';
import ReactRedirect from 'react-redirect';

var Loading = require('react-loading');

class GetProjects extends Component {

  constructor(props) {
    super(props);
    this.state = {
      projectList: '',
      checker: 0,
    };
  }

  componentWillMount = () => {
    axios.post('http://localhost:5000/projects', {
      token: cookie.load('token')
    }).then(function (response) {
      this.setState({projectList: response.data});
    }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
  }
  handleClick = (key, value, e) => {
    cookie.save('index', key, { path: '/' });
    console.log(cookie.load('index'));
    axios.post('http://localhost:5000/get_project',{
      index: key,
      token: cookie.load('token')
    }).then(function(response){
      cookie.save('projectID', response.data, { path: '/' });
      this.setState({checker: 1})
    }.bind(this))
    .catch(function(error){
      console.log(error);
    });
 
  }


  render() {
    if(this.state.projectList){
      if(this.state.checker == 0){
        return(
        <div>
        <img src="http://i.imgur.com/qA0mNgf.png"/>
        {Object.keys(this.state.projectList).map(function(key) {
          let boundProjectClick = this.handleClick.bind(this, key, this.state.projectList[key].name);
          return(
            <p onClick={boundProjectClick} className={s.file_list}>Name: {this.state.projectList[key].name}</p>
          );
        }.bind(this))}
        </div>);
      } else {


      return(<div><ReactRedirect location='http://localhost:3001/project'></ReactRedirect></div>)

      }
    }
    else {
      return(
        <div className={s.loading_style}>
        <img src="http://i.imgur.com/qA0mNgf.png"/>
        <Loading type='bubbles' color='#e3e3e3' />
        </div>
      );
    }

  }
}

export default withStyles(s)(GetProjects);
