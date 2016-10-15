import React, { Component, PropTypes } from 'react';
import * as axios from 'axios';

class Commits extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contributors: [ { name: 'Carlos Pinho',
          email: 'kakasp04@gmail.com',
          commits: 19,
          additions: 1112316,
          deletions: 1113262 },
        { name: 'pedrocaseiro',
            email: 'pcaseiro96@gmail.com',
            commits: 5,
            additions: 9090,
            deletions: 434 },
        { name: 'A Simoes',
            email: 'asimoes@student.dei.uc.pt',
            commits: 27,
            additions: 1282,
            deletions: 403 },
        { name: 'mariamargarida',
            email: 'mariamargaridals@gmail.com',
            commits: 2,
            additions: 765,
            deletions: 2 },
        { name: 'pcaseiro',
            email: 'pcaseiro@student.dei.uc.pt',
            commits: 11,
            additions: 348,
            deletions: 57 },
        { name: 'Dinis Coelho Marques',
            email: 'dinis.c.mrqs@gmail.com',
            commits: 4,
            additions: 79,
            deletions: 39 } ],
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
    console.log(this.state.contributors);
    if(this.state.contributors){
      return( 
       <div>
          {Object.keys(this.state.contributors).map(function(key) {
            return(
              <div>
                <div>Name: {this.state.contributors[key].name}</div>;
                <div>Email: {this.state.contributors[key].email}</div>;
                <div>Commits: {this.state.contributors[key].commits}</div>;
                <div>Additions: {this.state.contributors[key].additions}</div>;
                <div>Deletions: {this.state.contributors[key].deletions}</div>;
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


export default Commits;
