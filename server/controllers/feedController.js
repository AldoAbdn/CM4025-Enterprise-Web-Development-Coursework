var feedModel = require('../models/feedModel');
var setStatusMessage = require('../util/util').setStatusMessage;
var security = require('../security/security');
var feedSources = require('../rss/feeds');

/**
 * @module feedController
 * @description Handles retrieval of feeds and feed sources 
 */
module.exports = {
    async getFeeds(req,res,next){
        try {
            //Parse feeds source names
            let feeds = JSON.parse(req.query.feeds);
            //Filter 
            feeds = feeds.filter(security.filterSources);
            //Get feeds by list of feed sources 
            let jsonFeeds = await feedModel.getFeedsAsJSON(feeds); 
            //Return feeds as JSON
            return setStatusMessage(res,200,'OK').json(jsonFeeds);
        }catch(error){
            return setStatusMessage(res,500,"Error");
        }
    },

    async getFeedSources(req,res,next){
        try{
            //Returns a list of feed source names from the JSON file containing urls of all the sources 
            return setStatusMessage(res,200,'OK').json(Object.keys(feedSources));
        }catch(error){
            return setStatusMessage(res,500,"Error");
        }
    }
}
