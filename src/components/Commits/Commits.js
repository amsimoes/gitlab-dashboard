import React, { Component, PropTypes } from 'react';
import * as axios from 'axios';
import s from './Commits.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import Name from '../UserName';
import Email from '../ProjectName';
import Additionsn from '../Navigation';
import Deletions from '../Link';
import cookie from 'react-cookie';

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
            'rgba(150, 220, 220, 0.2)'
          ],
          fillColor: ['rgba(150, 220, 220, 0.2)'],
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
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    };
   }

  componentWillMount = () => {
    axios.post('http://localhost:5000/projects/contributors', {
      token: cookie.load('token'),
      projectID: cookie.load('projectID'),
      index: 0
    })
      .then(function (response) {
        var error =
          `
        "<!DOCTYPE html>
        <html>
        <head>
          <title>GitLab is not responding (502)</title>
          <link href="/static.css" media="screen" rel="stylesheet" type="text/css" />
          </head>
          <body>
            <h1>502</h1>
            <h3>GitLab is not responding.</h3>
            <hr/>
            <p>Please contact your GitLab administrator if this problem persists.</p>
          </body>
          </html>
          "
        `;
        if(response == error){
          console.log("deu erro!!");
          this.setState({contributors: ''});
        }
        //console.log(response);
        this.setState({contributors: JSON.parse(response.data).contributors});

      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    if(this.state.contributors){
      this.chartData.datasets[0].data = [];
      this.chartData.labels = [];
      return(
        <div>
            <p className={cx(s.graphic_name, s.lines)}>Commits per Team Member</p>
            <div className={s.graphic}><BarChart data={this.chartData} options={this.chartOptions} width="600" height="500"/></div>
<div className={cx(s.center,s.table)}>
            <div className={s.column}>
            {Object.keys(this.state.contributors).map(function(key, index) {
              this.chartData.datasets[0].data.push(this.state.contributors[key].commits);
              this.chartData.labels.push(this.state.contributors[key].name);
              if(index % 2 == 0){
                return(
                  <div className={s.lines}>
                      <div className={cx(s.style, s.style_width)}>Name: {this.state.contributors[key].name}</div>
                      <div className={s.style_width}>Email: {this.state.contributors[key].email}</div>
                      <div className={s.style_width}>Commits: {this.state.contributors[key].commits}</div>
                      <div className={s.style_width}>Additions: {this.state.contributors[key].additions}</div>
                      <div className={s.style_width}>Deletions: {this.state.contributors[key].deletions}</div>
                    </div>
                  );
            }
          }.bind(this))}
          </div>
          <div className={s.column}>
          {Object.keys(this.state.contributors).map(function(key, index) {
            if(index % 2 == 1){
              return(
                <div className={s.lines}>
                    <div className={cx(s.style, s.style_width)}>Name: {this.state.contributors[key].name}</div>
                    <div className={s.style_width}>Email: {this.state.contributors[key].email}</div>
                    <div className={s.style_width}>Commits: {this.state.contributors[key].commits}</div>
                    <div className={s.style_width}>Additions: {this.state.contributors[key].additions}</div>
                    <div className={s.style_width}>Deletions: {this.state.contributors[key].deletions}</div>
                  </div>
                );
          }
        }.bind(this))}
        </div>
        </div>
          </div>
      );
    } else {
      return(
        <div className={s.loading_style}><Loading type='bubbles' color='#e3e3e3' /></div>
      );
    }
  }
}


export default withStyles(s)(Commits);
