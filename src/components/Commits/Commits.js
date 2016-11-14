import React, { Component, PropTypes } from 'react';
import * as axios from 'axios';
import s from './Commits.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import Name from '../UserName';
import Email from '../ProjectName';
import Additionsn from '../Navigation';
import Deletions from '../Link';

var Loading = require('react-loading');
var BarChart = require("react-chartjs").Bar;

class Commits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contributors: '',
      check: false,
    };
    this.chartData = {
      labels: [],
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'

          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'

          ],
          borderWidth: 1,
          data: [],
        }
      ]
    };
    this.chartOptions = {
      scales: {
        xAxes: [{
          stacked: true
        }],
        yAxes: [{
          stacked: true
        }]
      }
    };
   }

  componentWillMount = () => {
    axios.post('http://localhost:5000/projects/contributors', {
      private_token: "8fH8Vs4WNpYhVUBPzq5g",
      index: 0
    })
      .then(function (response) {
        this.setState({contributors: response.data});
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    if(this.state.contributors){
      return(
        <div>
            <div className={s.graphic}><BarChart data={this.chartData} options={this.chartOptions} width="600" height="250"/></div>
          <div>
          {Object.keys(this.state.contributors).map(function(key) {
            this.chartData.datasets[0].data.push(this.state.contributors[key].commits);
            this.chartData.labels.push(this.state.contributors[key].name);
            return(
              <div className={cx(s.table, s.lines)}>
                <div>Name: {this.state.contributors[key].name}</div>
                <div>Email: {this.state.contributors[key].email}</div>
                <div>Commits: {this.state.contributors[key].commits}</div>
                <div>Additions: {this.state.contributors[key].additions}</div>
                <div>Deletions: {this.state.contributors[key].deletions}</div>
              </div>
          );
        }.bind(this))}
            </div>
          </div>
      );
    } else {
      return(
        <div><Loading type='bubbles' color='#e3e3e3' /></div>
      );
    }
  }
}


export default withStyles(s)(Commits);
