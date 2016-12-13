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
      axios.get('http://localhost:5000/create_risk')
        .then(function(response){
          if(response.data != 'False'){
            this.addAlert(response.data['descricao'], response.data['deadline'], response.data['impacto'], response.data['probabilidade']);
          }
        }.bind(this))
        .catch(function(error){
          console.log(error);
        });

    }.bind(this), 3000);
  };

  addAlert = (descricao, deadline, impacto, probabilidade) => {
    console.log("LUL");
    if(impacto == "Baixo") impacto = "Low";
    if(impacto == "Médio") impacto = "Medium";
    if(impacto == "Alto") impacto = "High";
    if(probabilidade == "Média") probabilidade = "Medium";
    if(probabilidade == "Baixa") probabilidade = "Low";
    if(probabilidade == "Alta") probabilidade = "High";
    this.refs.container.error(
      "A new " + impacto + " risk was created! It has a " + probabilidade + " probability ",
      "Deadline: " + deadline + ". Description: " + descricao, {
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
      </div>

    );
  }
}


export default withStyles(s)(Toast);
