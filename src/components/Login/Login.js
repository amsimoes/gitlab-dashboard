import React, { Component, PropTypes } from 'react';
import * as axios from 'axios';
import s from './Login.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import ReactRedirect from 'react-redirect';
import cookie from 'react-cookie';
import Toast from '../Toast';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: '',
      token: '',
      avatar: '',
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
    axios.post('http://localhost:5000/login',{
      username: this.state.user,
      password: this.state.password
    })
    .then(function(response){
      if(response.data.logged == "true"){
        this.setState({logged: 'true'});
        this.setState({token: response.data.token});
        cookie.save('token', this.state.token, { path: '/' });
        this.setState({avatar: response.data.image_url});
        cookie.save('user', this.state.user, { path: '/' });
        cookie.save('avatar', this.state.avatar, { path: '/' })
      } else {
        this.setState({logged: 'wrong'});
      }
      console.log(response.data.logged);
    }.bind(this))
    .catch(function(error){
      console.log(error);
    });
  }

  render() {
      let form = (<div className={cx(s.flex, s.justify_center, s.mtp_70)}>
      <form role="form" onSubmit={this.handleSubmit} className={s.form}>
      <div className="form-group">
      <input type="text" className={s.form_division} value={this.state.user} onChange={this.handleUserChange.bind(this)}placeholder="Username" />
      <input type="password" className={s.form_division} value={this.state.password} onChange={this.handlePasswordChange.bind(this)}placeholder="Password" />
      </div>
      <button type="submit" className={s.button} onClick={this.login.bind(this)}>Submit</button>
      </form>
      </div>)
    if(this.state.logged == "false"){
    return (
      <div>
        {form}
      </div>
    )
    }else if(this.state.logged == "wrong"){
      return(
        <div>
          <div className={s.error_message}>Wrong username or password!</div>
          {form}
        </div>
      )
    }else{
      return(<div><ReactRedirect location='http://localhost:3001/initialPage'></ReactRedirect></div>)
    }
  }
}


export default withStyles(s)(Login);
