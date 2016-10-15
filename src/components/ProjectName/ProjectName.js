import React, { Component, PropTypes } from 'react';
import * as axios from 'axios';

class ProjectName extends Component {

  constructor(props) {
    super(props);
    this.state = {
      projectName: '',
    };
  }

  componentWillMount = () => {

    axios.get('http://localhost:5000/list_projects')
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
        <div>{this.state.projectName}</div>
      </div>
    );
  }
}


export default ProjectName;
