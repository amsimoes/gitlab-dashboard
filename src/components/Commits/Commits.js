import React, { Component, PropTypes } from 'react';
import * as axios from 'axios';
import s from './Commits.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import Name from '../UserName';
import Email from '../ProjectName';
import Additionsn from '../Navigation';
import Deletions from '../Link';

class Commits extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contributors: '',
    };
  }

  componentWillMount = () => {
    axios.get('http://localhost:5000/projects/contributors')
      .then(function (response) {
        console.log(response.data);
        this.setState({contributors: response.data});
      }.bind(this))
      .catch(function (error) {
        console.log(error);

      });

  }

  render() {
    if(this.state.contributors){
      return(
       <div>
          {Object.keys(this.state.contributors).map(function(key) {
            return(
              <div className={cx(s.table, s.lines)}>
                <div >Name: {this.state.contributors[key].name}</div>
                <div>Email: {this.state.contributors[key].email}</div>
                <div>Commits: {this.state.contributors[key].commits}</div>
                <div>Additions: {this.state.contributors[key].additions}</div>
                <div>Deletions: {this.state.contributors[key].deletions}</div>
              </div>
            );
          }.bind(this))}
        </div>
      );
    } else {
      return(
       <div>
        LOADING
        </div>
      );
    }
  }
}


export default withStyles(s)(Commits);
