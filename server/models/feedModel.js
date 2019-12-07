var cache = require('memory-cache');
var feedUrls = require('../rss/feeds');
var request = require('request-promise');
var parseXML = require('xml2js-es6-promise');
var reducer = require('../rss/reducers').reducer;

/**
 * @module feedModel
 * @description Returns an object containing feeds, indexed by feed source name 
 */
module.exports = {
    async getFeedsAsJSON(feeds=[]){
        try{
            let jsonFeeds = {};
            for(let feed of feeds){
                //Check if cached
                let jsonFeed = cache.get(feed);
                //If cached add to return 
                if (jsonFeed!=null){
                    jsonFeeds[feed] = jsonFeed;
                } 
                //Else fetch and add to cache
                else {
                    let xml = await request.get(feedUrls[feed]);
                    let json = await parseXML(xml);
                    channel = reducer(feed,json);
                    //Set feed channel
                    jsonFeeds[feed] = channel;
                    //Cache feed for 3 minutes
                    cache.put(feed,channel,300000);
                }
            }
            return (jsonFeeds);
        }catch(error){
            return ({});
        }
    }
}