import React, { Component, PropTypes } from 'react';
import * as axios from 'axios';
import s from './AllCommits.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import Name from '../UserName';
import Email from '../ProjectName';
import Additionsn from '../Navigation';
import Deletions from '../Link';

var Loading = require('react-loading');

class AllCommits extends Component {

  constructor(props) {
    super(props);
    this.state = {
      commits: '',
    };
  }

  componentWillMount = () => {
    axios.post('http://localhost:5000/projects/commits',{
      private_token : '8fH8Vs4WNpYhVUBPzq5g',
      index : 0
    })
      .then(function (response) {
        console.log(response.data);
        this.setState({commits: response.data});
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    if(this.state.commits){
     return(
       <div className={s.grid}>
          {Object.keys(this.state.commits).map(function(key) {
            return(
              <div className={s.table}>
                <div className={s.file_list}>Name: {this.state.commits[key].author_name}</div>
                <div className={s.file_list}>Email: {this.state.commits[key].author_email}</div>
                <div className={s.file_list}>Data: {this.state.commits[key].created_at}</div>
                <div className={s.file_list}>Commits: {this.state.commits[key].message}</div>
                <div className={s.file_list}>Title: {this.state.commits[key].title}</div>
                </div>
            );
          }.bind(this))}
        </div>
      );
    } else {
      return(
       <div className={s.loading_style}>
          <Loading type='bubbles' color='#e3e3e3' />
        </div>
      );
    }
  }
}


export default withStyles(s)(AllCommits);
