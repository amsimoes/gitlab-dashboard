import React, { Component, PropTypes } from 'react';
import * as axios from 'axios';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListProjectFiles.css';
import cx from 'classnames';

class ListProjectFiles extends Component {

  constructor(props) {
    super(props);
    this.state = {
      files: '',
      depth: 0,
    };
  }

  componentWillMount = () => {
    axios.get('http://localhost:5000/projects/folders')
      .then(function(response){
        this.setState({files: response.data});
        this.setState({depth: 0});
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
      let nextDepth = this.state.depth + 1;
      this.setState({depth: nextDepth});
      console.log(this.state.depth);
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
      let nextDepth = this.state.depth - 1;
      this.setState({depth: nextDepth});
    }.bind(this))
    .catch(function(error){
      console.log(error);
    });
  }

  render = () =>{
    if(this.state.files) {
      let back;
      if(this.state.depth>0){
         back = <p onClick={this.backHandleClick} className={s.file_list}> .. </p>
      }
      return (
        <div className={s.grid}>
          <h2 className={s.grid_v}>
            {back}
              {Object.keys(this.state.files).map(function(key) {
                if(this.state.files[key] == "tree"){
                  let boundItemClick = this.handleClick.bind(this, key, this.state.files[key]);
                  return <p onClick={boundItemClick} className={s.file_list}>{key}</p>
                }
                return(<p className={s.file_list}><i class="fa fa-file-text-o" aria-hidden="true"></i> {key} </p>);
              }.bind(this))}
          </h2>
        </div>
      )
    } else {
      return <div className={s.loading_style}>Loading</div>;
    }
  }
}

export default withStyles(s)(ListProjectFiles);
