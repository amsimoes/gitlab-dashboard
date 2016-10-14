import React, { Component, PropTypes } from 'react';
import * as axios from 'axios';

class ListProjectFiles extends Component {

  constructor(props) {
    super(props);
    this.state = {
      files: '',
    };
  }

  componentWillMount = () => {
    axios.get('http://localhost:5000/projects/folders')
      .then(function(response){
        this.setState({files: response.data});
      }.bind(this))
      .catch(function(error){
        console.log(error);
      });

  }

  handleClick = (key, value, e) => {
    axios.post('http://localhost:5000/projects/folders', {
      folder: key
    })
    .then(function(response){
      this.setState({files: response.data});
    }.bind(this))
    .catch(function(error){
      console.log(error);
    });
  }

  backHandleClick = () =>{
    axios.post('http://localhost:5000/projects/folders',{
      folder: ''
    })
    .then(function(response){
      this.setState({files: response.data});
    }.bind(this))
    .catch(function(error){
      console.log(error);
    });
  }

  render = () =>{
    return (
      <div className="projectFiles">
        <h2>
       <p onClick={this.backHandleClick}> .. </p>
          {Object.keys(this.state.files).map(function(key) {
            if(this.state.files[key] == "tree"){
              let boundItemClick = this.handleClick.bind(this, key, this.state.files[key]);
              return <p onClick={boundItemClick}>{key}</p>
            }
          return <p> {key} </p>
         }.bind(this))}
        </h2>
      </div>
    )
  }
}

export default ListProjectFiles;
