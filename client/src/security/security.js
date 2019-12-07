/**
 * @class Security 
 * @description For securing app
 */
class Security {
    constructor(){
        this.feedSources = [];
    }

    /**
     * @function sanitize
     * @description removes any $ from keys
     * @param {Object} object 
     */
    sanitize(object){
        if (object instanceof Object) {
            for (var key in object){
                if(/^$/.test(key)) {
                    delete object[key];
                }
            }
        }
        return object;
    }

    /**
     * @function sanitizeString
     * @description removes any $ from string
     * @param {String} string 
     */
    sanitizeString(string){
        return string.replace(/^$/,'');
    }

    /**
     * @function filterSources
     * @description filters a list to only include available sources from the server 
     * @param {String} feedSource name of feed
     * @param {int} index index
     * @param {Array} array array 
     */
    filterSources = (feedSource, index, array)=>{
        return this.feedSources.indexOf(feedSource) >= 0;
    }

    /**
     * @function setFeedSources
     * @description sets feed sources 
     * @param {Array} feedSources list of feed source names
     */
    setFeedSources(feedSources){
        this.feedSources = feedSources;
    }
}

export default new Security();