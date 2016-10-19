import React, { Component, PropTypes } from 'react';
var LineChart = require("react-chartjs").Line;
import * as axios from 'axios';
import s from './CommitsGraph.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';

class CommitsGraph extends Component {

  constructor(props) {
    super(props);
    this.state = {
      check: false,
    };
    this.chartData = {
      labels: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10", "W11", "W12", "W13"],
      datasets: [{
        label: "My First dataset",
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
    axios.get('http://localhost:5000/projects/weekly_contributions')
      .then(function (response) {
        this.chartData.datasets[0].data = response.data;
        this.setState({check: true});
        console.log(response.data);
        console.log("já dei update");
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    if(this.state.check){
      return(<div className={s.graphic}><LineChart data={this.chartData} options={this.chartOptions} width="600" height="250" /></div>);
    } else {
      return <div className={s.loading_style}>Loading Chart</div>
    }
  }
}

export default withStyles(s)(CommitsGraph);
