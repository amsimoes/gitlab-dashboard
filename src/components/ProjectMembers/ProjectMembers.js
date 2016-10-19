import React, { Component, PropTypes } from 'react';
import * as axios from 'axios';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ProjectMembers.css';
import cx from 'classnames';

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
        <div className={s.table_margin}>
          {Object.keys(this.state.contributors).map(function(contributor) {
            return(
              <div className={s.table}>
                <li className={s.file_list}>{this.state.contributors[contributor]} </li>
             </div>
            );
          }.bind(this))}
        </div>
      )
    } else {
      return <div className={s.loading_style}>Loading</div>;
    }
  }
}

export default withStyles(s)(ProjectMembers);
