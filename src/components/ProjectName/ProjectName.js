import React, { Component, PropTypes } from 'react';
import * as axios from 'axios';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ProjectName.css';
import cx from 'classnames';

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
        console.log(response);

      }.bind(this))
      .catch(function (error) {
        console.log(error);

      });
  }

  render() {
    return(
      <div>
        <div className={s.t}>{this.state.projectName}</div>
      </div>
    );
  }
}

export default withStyles(s)(ProjectName);
