import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Toast.css';
import cx from 'classnames';
import * as axios from 'axios';
var ReactToastr = require("react-toastr");

var {ToastContainer} = ReactToastr; // This is a React Element.
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

class Toast extends Component {

  componentDidMount= () => {
    setInterval(function() {
      axios.get('http://localhost:5000/projects/folders')
        .then(function(response){
          this.addAlert();
          console.log("piçada");
        }.bind(this))
        .catch(function(error){
          console.log(error);
        });

    }.bind(this), 3000);
  };

  addAlert = () => {
    console.log("LUL");
    this.refs.container.error(
      "Welcome welcome welcome!!",
      "You are now home my friend. Welcome home my friend.", {
        timeOut: 2000,
        extendedTimeOut: 1000,
        preventDuplicates:true
      }
    );
  }

  render () {
    return (
      <div>
      <ToastContainer ref="container"
      toastMessageFactory={ToastMessageFactory}
      className="toast-bottom-left" />
      <button onClick={this.addAlert.bind(this)}>NÃO MEXAS NESTE BOTAO GUIGAS</button>
      </div>

    );
  }
}


export default withStyles(s)(Toast);
