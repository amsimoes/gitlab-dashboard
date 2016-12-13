import React, { Component, PropTypes } from 'react';
import * as axios from 'axios';
import s from './CommitsGraph.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import cookie from 'react-cookie';


var Loading = require('react-loading');
var LineChart = require("react-chartjs").Line;

class CommitsGraph extends Component {

  constructor(props) {
    super(props);
    this.state = {
      check: false,
    };
    this.chartData = {
      labels: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10", "W11", "W12", "W13", "W14"],
      datasets: [{
        label: "Commits per week",
        fillColor: "rgba(150,220,220,0.2)",
        strokeColor: "rgba(220,220,220,1)",
        pointColor: "rgba(220,220,220,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: []
      }],
    };
    this.chartOptions = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    };
  };

  componentWillMount = () => {
    axios.post('http://localhost:5000/projects/weekly_contributions', {
      token: cookie.load('token'),
      projectID: cookie.load('projectID'),
      index: 0
    })
      .then(function (response) {
        console.log(response.data);
        this.chartData.datasets[0].data = response.data;
        this.setState({check: true});
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    if(this.state.check){
      return(
        <div>
          <p className={cx(s.graphic_name, s.lines)}>Commits per week</p>
        <div className={s.graphic}>
          <LineChart data={this.chartData} options={this.chartOptions} width="600" height="250" />
          </div>
        </div>
      );
    } else {
      return (
        <div className={s.loading_style}><Loading type='bubbles' color='#e3e3e3' /></div>
      );
    }
  }
}

export default withStyles(s)(CommitsGraph);
