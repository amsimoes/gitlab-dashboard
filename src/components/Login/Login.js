import React, { Component, PropTypes } from 'react';
import * as axios from 'axios';
import s from './Login.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import ReactRedirect from 'react-redirect';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: '',
      logged: 'false'
    };
  }

  handleUserChange(event) {
    this.setState({user: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }


  handleSubmit(event) {
    event.preventDefault();
  }

  login = () =>{
    console.log("##############");
    axios.post('http://localhost:5000/login',{
      username: this.state.user,
      password: this.state.password
    })
    .then(function(response){
      if(response.data.logged == "true"){
        this.setState({logged: 'true'});
      } else {
        this.setState({logged: 'false'});
      }
      console.log(response.data.logged); 
    }.bind(this))
    .catch(function(error){
      console.log(error);
    });
  }

  render() {
    if(this.state.logged == "false"){
    return (
      <div>
      <form role="form" onSubmit={this.handleSubmit}>
      <div className="form-group">
      <input type="text" value={this.state.user} onChange={this.handleUserChange.bind(this)}placeholder="Username" />
      <input type="password" value={this.state.password} onChange={this.handlePasswordChange.bind(this)}placeholder="Password" />
      <p>{this.state.user}</p>
      </div>
      <button type="submit" onClick={this.login.bind(this)}>Submit</button>
      </form>
      </div>
    )
    }else{
      return(<div><ReactRedirect location='http://localhost:3001/project'></ReactRedirect></div>)
    }
  }
}


export default withStyles(s)(Login);
