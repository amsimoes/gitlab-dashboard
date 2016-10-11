var App = React.createClass({
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


  },
  updateState: function(newState){
    this.setState({files: newState});
  },

  render: function(){
    return (
      <div>
        <div className="listProjectName">
          <ProjectName project_name={this.state.project_name}/>
        </div>
        <div className="listProjectContributors">
          <ProjectContributors project_contributors={this.state.contributors}/>
        </div>
        <div className="listProjectFiles">
          <ProjectFiles project_files={this.state.files} updateState={this.updateState}/>
        </div>
      </div>
    )
  }
});

var ProjectName = React.createClass({
  render: function(){
    return (
      <div class="projectName">
        <h2>{this.props.project_name}</h2>
      </div>
    )
  }
});

var ProjectContributors = React.createClass({
  render: function(){
    return (
      <div class="contributors">
      <h2>{_.map(this.props.project_contributors, function(contributor){
        return <li> {contributor} </li>
      })}</h2>
      </div>
    )
  }

});

var ProjectFiles = React.createClass({
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
      <div class="projectFiles">

      <h2>
      <p onClick={this.backHandleClick}> .. </p>
      {Object.keys(this.props.project_files).map(function(key) {
        if(this.props.project_files[key] == "tree"){
          let boundItemClick = this.handleClick.bind(this, key, this.props.project_files[key]);

          return <p onClick={boundItemClick}>{key}</p>
        }
        return <p> {key} </p>
      }.bind(this))}
      </h2>
      </div>
    )
  }
});


React.render(
    <App/>,
    document.getElementById('main')
  );
