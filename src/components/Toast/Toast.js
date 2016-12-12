import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Toast.css';
import cx from 'classnames';
var ReactToastr = require("react-toastr");

var {ToastContainer} = ReactToastr; // This is a React Element.
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

class Toast extends Component {



  addAlert () {
    this.refs.container.success(
      "Welcome welcome welcome!!",
      "You are now home my friend. Welcome home my friend.", {
        timeOut: 30000,
        extendedTimeOut: 10000

      }
    );
  }

  render () {
    return (
      <div>
      <ToastContainer ref="container"
      toastMessageFactory={ToastMessageFactory}
      className="toast-top-right" />
      <button onClick={this.addAlert.bind(this)}>NÃO MEXAS NESTE BOTAO GUIGAS</button>
      </div>

    );
  }
}


export default withStyles(s)(Toast);
