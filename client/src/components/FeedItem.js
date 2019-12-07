import React from 'react';

/**
 * @class FeedItem
 * @description Represents a single item from a feed, renders it as a bootstrap card 
 */
class FeedItem extends React.Component {
  /**
   * Tries to get an image url from a feed item 
   * @param {Object} item 
   */
  getImageUrl(item){
    let key=Object.keys(item).filter((key)=>{return key.includes('media')})[0];
    if(key!=null){
      return item[key];
    } else {
      return item.feed.image;
    }
  }
  /**
    * @function render
    * @description React lifecycle method, returns visible part of component 
    */
  render() {
    let item = this.props.item;
    return (
      <div className="card feed-item">
        <div className="card-header">
          <a href={item.feed.link}>{item.feed.title}</a>
        </div>
        <img className="card-img-top" src={this.getImageUrl(item)} alt={item.title} onError={(e)=> e.target.style.display="none"}/>
        <div className="card-body">
          <h5 className="card-title" dangerouslySetInnerHTML={{__html:item.title}}></h5>
          <p className="card-text" dangerouslySetInnerHTML={{__html:item.description}}></p>
          <a className="card-link" href={item.link}>Go To Article</a>
        </div>
        <div className="card-footer text-muted">
          {item.pubDate};
        </div>
      </div>
    );
  }
}

export default FeedItem;