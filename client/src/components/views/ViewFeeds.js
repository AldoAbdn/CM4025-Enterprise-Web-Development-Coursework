import React from 'react';
import feedController from '../../controllers/feedController';
import FeedItem from '../FeedItem';
import security from '../../security/security';

/**
 * @class ViewFeeds
 * @description Feeds view that gets feeds using feed controller and displays them 
 */
class ViewFeeds extends React.Component {
  constructor(props){
    super(props);
    this.state = {feedSources:[],feeds:{},errorMessage:""};
  }

  /**
   * @function componentDidMount
   * @async
   * @description React lifecycle method. When component is first loaded, gets list of available feeds from the server and tries to get user's selected feeds 
   */
  async componentDidMount(){
    this.props.setLoading({viewFeeds:true});
    await this.updateFeedSources();
    await this.updateFeeds();
    this.props.setLoading({viewFeeds:false});
  }

  /**
   * @function componentDidUpdate
   * @async
   * @description React lifecycle method. When component is updated, viewable feeds
   */
  async componentDidUpdate(prevProps){
    if(prevProps.feedSources.length!==this.props.feedSources.length){
      this.props.setLoading({viewFeeds:true});
      security.setFeedSources(this.props.feedSources);
      await this.updateFeeds();
      this.props.setLoading({viewFeeds:false});
    }  
  }
  
  /**
   * @function updateFeeds
   * @async
   * @description updates viewable feeds
   */
  async updateFeeds(){
    try{
      let feeds = await feedController.getFeeds(this.props.feedSources.filter(security.filterSources), this.props.token);
      this.setState({feeds:feeds});
      this.setState({errorMessage:""});
    }catch(error){
      this.setState({errorMessage:error.message});
    }
  }

  /**
   * @function updateFeedSources
   * @async
   * @description gets list of feeds that can be retrieved from the server 
   */
  async updateFeedSources(){
    try{
      let feedSources = await feedController.getFeedSources(this.props.token);
      this.props.handleFeedSourcesUpdate(feedSources);
      this.setState({errorMessage:""});
    }catch(error){
      this.setState({errorMessage:error.message});
    }
  }

  /**
   * @function mapFeedItems
   * @description Map function that maps a feed item to a component that renders it 
   * @param {Object} item feed item 
   * @param {int} index index in array
   * @param {Array} array entire array 
   */
  mapFeedItems = (item, index, array) => {
    return <FeedItem item={item}/>
  }

  /**
   * @function sortPosts 
   * @description Sort function that sorts dates, newest first 
   */
  sortPosts = (a,b) => {
    return (new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
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
    let lastLogin = new Date(this.props.lastLogin);
    let newPosts = [];
    let oldPosts = [];
    for (let [key, feed] of Object.entries(this.state.feeds)){
      if(feed.item){
        for (let item of feed.item){
          item.feed = {title:feed.title,description:feed.description,link:feed.link,image:feed.image!=undefined ? feed.image.url:""};
          let date = new Date(item.pubDate);
          if(lastLogin.getTime() <= date.getTime()){
            newPosts.push(item);
          } else {
            oldPosts.push(item);
          }
        }
      }
    }
    newPosts = newPosts.sort(this.sortPosts);
    oldPosts = oldPosts.sort(this.sortPosts);
    return (
      <div id="viewFeeds" className="card row">
        <div className="col-sm-12">
        {errorMessage}
          <h5>View Feeds</h5>
          <div className={newPosts.length>0?"row card":"d-none"}>
            <div className="col-sm-12">
              <h5>New Posts</h5>
              {newPosts.map(this.mapFeedItems)}
            </div>
          </div>
          <div className={oldPosts.length>0?"row card":"d-none"}>
            <div className="col-sm-12">
              <h5>Old Posts</h5>
              {oldPosts.map(this.mapFeedItems)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ViewFeeds;