import React, { Component, PropTypes } from 'react';
import * as axios from 'axios';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ProcessesOptions.css';
import cx from 'classnames';
import Link from '../Link';
import Dropdown from 'react-dropdown';
import ReactRedirect from 'react-redirect'


var Loading = require('react-loading');

const options = [
      'Risk', 'Effort'
    ];

class ProcessesOptions extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: options[0],
    };
  }

  _onSelect = (option) => {
    console.log('You selected ', option.label)
    this.setState({selected: option})
    console.log(this.state.selected)
  }

  render() {
    let label;
    const defaultOption = this.state.selected;
    if(this.state.selected.label == 'Risk'){
      label=(<div>
        <ReactRedirect location='http://localhost:9000/visualizarRiscos.html'></ReactRedirect>
        </div>)
    } else if ( this.state.selected.label == 'Effort' ){
      label=(<div>
        <ReactRedirect location='http://localhost:8000/effortTimeline.html'></ReactRedirect>
        </div>)
    }
    return(
      <div>
        <Dropdown options={options} onChange={this._onSelect} value={defaultOption} value='Processes'/>
        {label}
       </div>
     ) 
  }
}

export default withStyles(s)(ProcessesOptions);

