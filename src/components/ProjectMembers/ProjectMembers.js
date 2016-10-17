import React, { Component, PropTypes } from 'react';
import * as axios from 'axios';
class ProjectMembers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contributors: '',
    };
  }

  componentWillMount = () => {
    axios.get('http://localhost:5000/projects/members')
      .then(function (response) {
        this.setState({contributors: response.data});
      }.bind(this))
      .catch(function (error) {
      });
  }
  render = () =>{
    if(this.state.contributors) {
      return (
        <div className="contributors">
          {Object.keys(this.state.contributors).map(function(contributor) {
            return(
              <div>
                <li> {this.state.contributors[contributor]} </li>
             </div>
            );
          }.bind(this))}
        </div>
      )
    } else {
      return <div>Loading</div>;
    }
  }
}

export default ProjectMembers;
