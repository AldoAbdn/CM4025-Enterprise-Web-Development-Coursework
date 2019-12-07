import React from 'react';
import userController from '../../controllers/userController';
import security from '../../security/security';

/**
 * @class ManageFeedSources
 * @description User view for adding and removing users selected feeds 
 */
class ManageFeedSources extends React.Component {
  constructor(props) {
    super(props);
    this.state={filter:"",errorMessage:""};
  }
  /**
   * @function componentDidMount
   * @async
   * @description React lifecycle method. When component is first loaded, gets users details from controller with auth token passed from App
   */
  async componentDidMount(){
    this.props.setLoading({manageFeedSources:true});
    try {
      let user = await userController.getDetails(this.props.token);
      this.props.handleUserUpdate(user);
      this.setState({errorMessage:""});
    }catch(error){
      this.setState({errorMessage:error.message});
    }
    this.props.setLoading({manageFeedSources:false});
  }

  /**
    * @function handleOnChange
    * @description Handles input onChange event, updates state  
    * @param {event} e submit event 
    */
  handleOnChange = (e) => {
    this.setState({filter:e.target.value}); //Changes filter value to show only available feed names that match 
  }

  /**
   * @function handleAddClick
   * @async
   * @description Makes call to user controller to add a feed to user object 
   * @param {event} e click event 
   */
  handleAddClick = async (e) => {
    this.props.setLoading({manageFeedSources:true});
    try {
      let user = await userController.addFeed(security.sanitizeString(e.target.id),this.props.token); //Pass feed name and users auth token 
      this.props.handleUserUpdate(user); //Pass user up to App 
      this.setState({errorMessage:""});
    }catch(error){
      this.setState({errorMessage:error.message});
    }
    this.props.setLoading({manageFeedSources:false});
  }

  /**
   * @function handleDeleteClick
   * @async
   * @description Makes call to user controller to remove a feed from user object 
   * @param {event} e click event 
   */
  handleDeleteClick = async (e) => {
    this.props.setLoading({manageFeedSources:true});
    try {
      let user = await userController.removeFeed(security.sanitizeString(e.target.id),this.props.token); //Pass feed anme and user auth token 
      this.props.handleUserUpdate(user); //Pass user up to App
      this.setState({errorMessage:""});
    }catch(error){
      this.setState({errorMessage:error.message});
    }
    this.props.setLoading({manageFeedSources:false});
  }

  /**
   * @function mapAddFeedSources
   * @description Map function that maps a feed source name to a list group item with a + symbol for adding to users list 
   * @param {String} feedSource name of feed
   * @param {int} index index in array
   * @param {Array} array entire array 
   */
  mapAddFeedSources = (feedSource,index,array)=>{
      return <li key={index} className="list-group-item d-flex justify-content-between align-items-center">{feedSource} <span id={feedSource} onClick={this.handleAddClick} className="fas fa-plus"></span></li>
  }

  /**
   * @function mapRemoveFeedSources
   * @description Map function that maps a feed source name to a list group item with a - symbol for removing from users list 
   * @param {String} feedSource name of feed
   * @param {int} index index in array
   * @param {Array} array entire array 
   */
  mapRemoveFeedSources = (feedSource, index, array)=>{
    return <li key={index} className="list-group-item d-flex justify-content-between align-items-center">{feedSource} <span id={feedSource} onClick={this.handleDeleteClick} className="fas fa-times"></span></li>
  }

  /**
   * @function filteredFeedSources
   * @description Filter function that filters out feed names that the user already has added 
   * @param {String} feedSource name of feed
   * @param {int} index index in array
   * @param {Array} array entire array 
   */
  filterExistingFeedSources = (feedSource, index, array)=>{
    if(this.props.userFeedSources!==undefined){
      return !(this.props.userFeedSources.indexOf(feedSource)>=0);
    } else {
      return true;
    }
  }

  /**
   * @function filterByFilter
   * @description Filter function that filters feed source names by a string value (filter)
   * @param {String} feedSource name of feed
   * @param {int} index index in array
   * @param {Array} array entire array 
   */
  filterByFilter = (feedSource, index, array)=>{
    if(this.state.filter!==""){
      return feedSource.includes(this.state.filter);
    }else{
      return true;
    }
  }

  /**
    * @function render
    * @description React lifecycle method, returns visible part of component 
    */
  render() {
    let errorMessage;
    if(this.state.errorMessage!==""){
      errorMessage = <p className="alert alert-danger">{this.state.errorMessage}</p>
    }
    let userFeedSources = this.props.userFeedSources || [];
    let filteredFeedSources = this.props.feedSources.filter(this.filterExistingFeedSources) || [];
    filteredFeedSources = filteredFeedSources.filter(this.filterByFilter);
    return (
      <div id="manageFeedSources" className="card row">
        <div className="col-sm-12">
          {errorMessage}
          <div className="row">
            <div className="col-sm-12">
              <form>
                <h5>Feed Management</h5>
                <input className="form-control" value={this.state.filter} onChange={this.handleOnChange} type="text" placeholder="Filter"/>
              </form>
            </div>
          </div>
          <div className={filteredFeedSources.length>0?"row":"d-none"}>
            <div className="col-sm-12">
              <h6>Add Feeds</h6>
              <ul className="list-group">
                {filteredFeedSources.map(this.mapAddFeedSources)}
              </ul>
            </div>
          </div>
          <div className={userFeedSources.length>0?"row":"d-none"}>
            <div className="col-sm-12">
              <h6>Current Feeds</h6>
              <ul className="list-group" id="current-feed-list">
                {userFeedSources.map(this.mapRemoveFeedSources)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ManageFeedSources;