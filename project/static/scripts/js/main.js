(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var App = React.createClass({displayName: "App",
  getInitialState: function(){
    return {
      project_name: '',
      contributors: '',
      files: ''
    }
  },

  componentWillMount: function(){
    axios.get('list_projects')
      .then(function (response) {
        this.setState({project_name: response.data});
        console.log(response);
      }.bind(this))
      .catch(function (error) {
        console.log(error);

      });
    axios.get('projects/members')
      .then(function (response) {
        this.setState({contributors: response.data});
        console.log(response.data);

      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });

    axios.get('projects/folders')
      .then(function(response){
        this.setState({files: response.data});
      }.bind(this))
      .catch(function(error){
        console.log(error);
      });


    axios.post('projects/folders', {
      folder: ""
    })
    .then(function(response){
      this.setState({files: response.data});
      console.log(response);
    }.bind(this))
    .catch(function(error){
      console.log(error);
    });
  },
  updateState: function(newState){
    this.setState({files: newState});
  },

  render: function(){
    return (
      React.createElement("div", null, 
        React.createElement("div", {className: "listProjectName"}, 
          React.createElement(ProjectName, {project_name: this.state.project_name})
        ), 
        React.createElement("div", {className: "listProjectContributors"}, 
          React.createElement(ProjectContributors, {project_contributors: this.state.contributors})
        ), 
        React.createElement("div", {className: "listProjectFiles"}, 
          React.createElement(ProjectFiles, {project_files: this.state.files, updateState: this.updateState})
        )
      )
    )
  }
});

var ProjectName = React.createClass({displayName: "ProjectName",
  render: function(){
    return (
      React.createElement("div", {class: "projectName"}, 
        React.createElement("h2", null, this.props.project_name)
      )
    )
  }
});

var ProjectContributors = React.createClass({displayName: "ProjectContributors",
  render: function(){
    return (
      React.createElement("div", {class: "contributors"}, 
      React.createElement("h2", null, _.map(this.props.project_contributors, function(contributor){
        return React.createElement("li", null, " ", contributor, " ")
      }))
      )
    )
  }

});

var ProjectFiles = React.createClass({displayName: "ProjectFiles",
  handleClick: function(key, value, e) {
    axios.post('projects/folders', {
      folder: key
    })
    .then(function(response){
      this.props.updateState(response.data);
      console.log(this.props.project_files);
    }.bind(this))
    .catch(function(error){
      console.log(error);
    });
  },
  backHandleClick: function(){
    axios.post('projects/folders',{
      folder: ''
    })
    .then(function(response){
      this.props.updateState(response.data);
      console.log(this.props.project_files);
    }.bind(this))
    .catch(function(error){
      console.log(error);
    });
  },
  render: function(){
    return (
      React.createElement("div", {class: "projectFiles"}, 

      React.createElement("h2", null, 
      React.createElement("p", {onClick: this.backHandleClick}, " .. "), 
      Object.keys(this.props.project_files).map(function(key) {
        if(this.props.project_files[key] == "tree"){
          let boundItemClick = this.handleClick.bind(this, key, this.props.project_files[key]);

          return React.createElement("p", {onClick: boundItemClick}, key)
        }
        return React.createElement("p", null, " ", key, " ")
      }.bind(this))
      )
      )
    )
  }
});
React.render(
    React.createElement(App, null),
    document.getElementById('main')
  );

},{}]},{},[1]);
