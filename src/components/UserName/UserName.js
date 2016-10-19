import React, { Component, PropTypes } from 'react';
import * as axios from 'axios';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './UserName.css';
import cx from 'classnames';

class UserName extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
  }

  //componentWillMount = () => {

    //// MAKE A REQUEST TO THE API TO GET THE CURRENT USER
    ////
    //axios.get('http://localhost:5000/list_projects')
      //.then(function (response) {
        //this.setState({projectName: response.data});
        //console.log(response);

      //}.bind(this))
      //.catch(function (error) {
        //console.log(error);

      //});
  //}

  render() {
    return(
      <div>
        <div className={s.line_text}><p>O Username atual é TODO THIS SHIT!!!!</p></div>
      </div>
    );
  }
}


export default withStyles(s)(UserName);
