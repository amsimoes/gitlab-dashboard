import React, { Component, PropTypes } from 'react';
import * as axios from 'axios';
import s from './AllCommits.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import Name from '../UserName';
import Email from '../ProjectName';
import Additionsn from '../Navigation';
import Deletions from '../Link';

class AllCommits extends Component {

  constructor(props) {
    super(props);
    this.state = {
      commits: '',
    };
  }

  componentWillMount = () => {
    axios.get('http://localhost:5000/projects/commits')
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
       <div >
          {Object.keys(this.state.commits).map(function(key) {
            return(
              <div>
                <div>Name: {this.state.commits[key].author_name}</div>
                <div>Email: {this.state.commits[key].author_email}</div>
                <div>Data: {this.state.commits[key].created_at}</div>
                <div>Commits: {this.state.commits[key].message}</div>
                <div>Title: {this.state.commits[key].title}</div>
                </div>
            );
          }.bind(this))}
        </div>
      );
    } else {
      return(
       <div className={s.loading_style}>
        Loading
        </div>
      );
    }
  }
}


export default withStyles(s)(AllCommits);
