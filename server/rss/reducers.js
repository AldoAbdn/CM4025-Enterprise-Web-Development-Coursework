/**
 * @module reducers
 * @description helper functions for restructuring json 
 */

function reduce(feed,json){
    //Get Channel Object
    let channel = json.rss.channel[0];
    let keys = Object.keys(channel);
    //Convert arrays to straight values 
    for (let key of keys){
        if(key!='item') //Check its not items array
            channel[key] = channel[key][0];
    }
    //For each item, change arrays to straight values
    for (let item of channel.item){
        let keys = Object.keys(item);
        for (let key of keys){
            item[key] = item[key][0];
        }
    }
    return channel;
}

module.exports.reducer = reduce; 