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

var page = 0;

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
      page: page,
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

  handleBackClick = () => {
    if(page > 0){
      page--;
    }
    axios.post('http://localhost:5000/projects/commits',{
      private_token : '8fH8Vs4WNpYhVUBPzq5g',
      page: page,
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

  handleClick = () => {
    page++;
    axios.post('http://localhost:5000/projects/commits',{
      private_token : '8fH8Vs4WNpYhVUBPzq5g',
      page: page,
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
    let backButton;
    if(page > 0){
      backButton = (<button type="submit" className={s.button} onClick={this.handleBackClick.bind(this)}>Previous Page</button>)
    }
    if(this.state.commits){
      let commits = (<div className={s.grid}>
          {Object.keys(this.state.commits).map(function(key) {
            return(
              <div className={s.table}>
                <div className={s.file_list}>Name: {this.state.commits[key].author_name}</div>
                <div className={s.file_list}>Email: {this.state.commits[key].author_email}</div>
                <div className={s.file_list}>Data: {this.state.commits[key].created_at}</div>
                <div className={s.file_list}>Commits: {this.state.commits[key].message}</div>
                <div className={cx(s.file_list, s.table_down)}>Title: {this.state.commits[key].title}</div>
                </div>
            );
          }.bind(this))}
          {backButton}
          <button type="submit" className={s.button} onClick={this.handleClick.bind(this)}>Next Page</button>
        </div>)
     return(
       <div>
      {commits}
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
