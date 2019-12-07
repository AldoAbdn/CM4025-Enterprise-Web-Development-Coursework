var userModel = require('../models/userModel');
var security = require('../security/security');
var setStatusMessage = require('../util/util').setStatusMessage;

/**
 * @module userController 
 * @description Handles getting and updating of user data 
 */
module.exports = {
    getDetails(req,res,next){
        try{
            //Gets user 
            let user = res.locals.user;
            //Removes password and id and returns 
            return setStatusMessage(res,200,'OK').json(user);
        }catch(error){
            return setStatusMessage(res,500,'Error');
        }
    },

    async addFeed(req,res,next){
        try{
            //Get feed source
            let feedSource = req.body.feedSource;
            //Gets user 
            let user = res.locals.user;
            //Checks if feed sources exists 
            if(user.feedSources.indexOf(feedSource)<0){
                //Updates user 
                user.feedSources.push(feedSource);
                let update = await userModel.updateOne({_id:user._id},{$set:{feedSources:user.feedSources}});
                if(!update) return setStatusMessage(res,404,'User Not Found').json({message:'User Not Found'});
                return setStatusMessage(res,200,'OK').json(user);
            } else {
                return setStatusMessage(res,200,'OK').json(user);
            }
        }catch(error){
            return setStatusMessage(res,500,"Error");
        }
    },

    async removeFeed(req,res,next){
        try{
            //Gets feed source 
            let feedSource = req.body.feedSource;
            //Gets user 
            let user = res.locals.user;
            //Checks if feed source exists 
            if(user.feedSources.indexOf(feedSource)>=0){
                //Filters out passed in feed source 
                user.feedSources = user.feedSources.filter(function(value,index,array){
                    return value != feedSource;
                });
                //Updates user 
                let update = await userModel.updateOne({_id:user._id},{$set:{feedSources:user.feedSources}});
                if(!update) return setStatusMessage(res,404,'User Not Found').json({message:'User Not Found'});
                return setStatusMessage(res,200,'OK').json(user);
            } else {
                return setStatusMessage(res,200,'OK').json(user);
            }
        }catch(error){
            return setStatusMessage(res,500,"Error");
        }
    }
}