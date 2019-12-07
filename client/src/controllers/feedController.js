import Controller from './controller';
/**
 * @class FeedController 
 * @description Feed Controller for gettting feeds from the server 
 */
class FeedController extends Controller {
    constructor(){
        super("/api/feed/")
    }

    async getFeeds(feeds, token){
        let response = await fetch(this.path+"getFeeds?feeds="+JSON.stringify(feeds), {
            method:'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'x-access-token': token
            }
        });
        return response.json();
    }

    async getFeedSources(token){
        let response = await fetch(this.path+"getFeedSources", {
            method:'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'x-access-token': token
            }
        });
        return response.json();
    }
}

export default new FeedController();