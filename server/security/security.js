var userModel = require('../models/userModel');
var jwt = require('jsonwebtoken');
var setStatusMessage = require('../util/util').setStatusMessage;
var feeds = Object.keys(require('../rss/feeds'));
var config = require('../config/config'); //Would normally pass these values as environment variables

/**
 * @module security
 * @description collection of helper security functions 
 */

/**
 * @function secure
 * @description Middleware for setting properties of request and response 
 * @param {Request} req 
 * @param {Response} res
 * @param {Function} next Continues middleware chain 
 */ 
module.exports.secure = function(req,res,next){
    if(req.path === ""){
        setHTMLResponseHeader(res);
    } else {
        switch(req.method){
            case 'GET':
                secureGET(req,res);
                break;
            case 'POST':
                securePOST(req,res);
                break;
        }
    }
    next();
}

/**
 * @function checkToken 
 * @description Check vadility of token and parses user from it 
 * @param {Request} req 
 * @param {Response} res
 * @param {Function} next Continues middleware chain 
 */ 
module.exports.checkToken = async function(req,res,next){
    try{
        //Get token 
        let token = req.headers['x-access-token'];
        if(!token) return setStatusMessage(res,401,"No Token Provided");
        //Decode 
        let decoded = jwt.verify(token, config.secret);
        if(!decoded) return setStatusMessage(res,404,'No User Found');
        //Get user form ID 
        let user = await userModel.findById(decoded.id);
        if(!user) return setStatusMessage(res,404,"No User Found");
        //Set user in a local so it can be used later in middleware chain 
        res.locals.user = user;
        next();
    }catch(error){
        return setStatusMessage(res,500,"Failed to Authenticate Token");
    }
}

module.exports.filterSources = function(feedSource,index,array){
    return feeds.indexOf(feedSource) >= 0;
}

function setHTMLResponseHeader(res){
    //Explicity set content type and UTF-8 encoding
    res.set({'content-type':'text/html; charset=utf-8'});
}

function securePOST(req,res,next){
    sanitize(req.body);
    setJSONResponseHeader(res);
}

function secureGET(req,res,next){
    sanitize(req.query);
    setJSONResponseHeader(res);
}

function sanitize(object){
    if (object instanceof Object) {
        for (let key in object){
            if(/^$/.test(key)) {
                delete object[key];
            }
        }
    }
    return object;
}

function setJSONResponseHeader(res){
    //Explicitly set content type and UTF-8 encoding
    res.set({'Content-Type':'application/json; charset=utf-8'});
}