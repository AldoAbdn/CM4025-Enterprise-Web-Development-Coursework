import React from 'react';
import ManageFeedSources from './views/ManageFeedSources';
import ViewFeeds from './views/ViewFeeds';

/**
 * @class Dashboard 
 * @description Wrapper component that displays ManageFeedSources and ViewFeeds
 */
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {user:{email:"",feedSources:[]}, feedSources:[]}
  }

  /**
   * @function handleUserUpdate
   * @description Sets new user 
   */
  handleUserUpdate = (user) => {
    this.setState({user:user});
  }

  /**
   * @function handleFeedSourcesUpdate
   * @description Sets a new list of feed sources 
   */
  handleFeedSourcesUpdate = (feedSources)=>{
    this.setState({feedSources:feedSources});
  }

  /**
    * @function render
    * @description React lifecycle method, returns visible part of component 
    */
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div class="card row">
              <h1>RSS Feed Viewer</h1>
              <h3>{this.state.user.username}</h3>
              <a href="/api.html" target="_blank">API Documentation</a>
              <button className="btn btn-primary btn-block" onClick={this.props.handleLogoutClick}>Logout</button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <ManageFeedSources setLoading={this.props.setLoading} feedSources={this.state.feedSources || []} userFeedSources={this.state.user.feedSources||[]} token={this.props.token} handleUserUpdate={this.handleUserUpdate}/>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <ViewFeeds setLoading={this.props.setLoading} token={this.props.token} lastLogin={this.state.user.lastLogin} handleFeedSourcesUpdate={this.handleFeedSourcesUpdate} feedSources={this.state.user.feedSources}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
