import React, { Component, PropTypes } from 'react';
import * as axios from 'axios';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Logout.css';
import cx from 'classnames';
import cookie from 'react-cookie';
import ReactRedirect from 'react-redirect';

class Logout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      logged: 'true',
    };
  }

  logout = () => {
    cookie.remove('user', { path: '/'  });
    this.setState({logged: 'false'});
  }

  render() {
    let logout_button;
    if(this.state.logged == "false"){
      logout_button = (<ReactRedirect location='http://localhost:3001'></ReactRedirect>)
    }
    return(
      <div>
        <button type="submit" onClick={this.logout.bind(this)}>Logout</button>
        {logout_button}
      </div>
    );
  }
}


export default withStyles(s)(Logout);
