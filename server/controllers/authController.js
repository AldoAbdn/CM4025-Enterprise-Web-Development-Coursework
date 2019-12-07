var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config/config');
var userModel = require('../models/userModel');
var setStatusMessage = require('../util/util').setStatusMessage;

/**
 * @module Auth Controller 
 * @description Handles auth routes and app authentication 
 */
module.exports = {
    async signup(req,res,next){
        try{
            //Hash Password 
            let hashedPassword = bcrypt.hashSync(req.body.password,8);
            //Create New User 
            let user = await userModel.create({username: req.body.username,password: hashedPassword});
            if(!user) return setStatusMessage(res,500,"Error");
            //Create token 
            let token = jwt.sign({id:user._id},config.secret,{
                expiresIn: 86400
            });
            //Return auth
            setStatusMessage(res,200,'OK').json({auth:true,token,message:"Sign Up Successful"});
        }catch(error){
            return setStatusMessage(res,500,"Error");
        }
    },

    async login(req,res,next){
        try{
            //Find user 
            let user = await userModel.findOne({username:req.body.username},'+password');
            if(!user) return setStatusMessage(res,404,'User Not Found').json({auth:false,message:"User Not Found"});
            //Update last login 
            let update = await userModel.updateOne({_id:user._id},{$set:{lastLogin:user.login,login:Date.now()}});
            if(!update) return setStatusMessage(res,404,'User Not Found').json({auth:false,message:'User Not Found'});
            //Check if password is valid 
            let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if(!passwordIsValid) return setStatusMessage(res,401,'Incorrect Password').json({auth:false,token:null,message:"Incorrect Password"});
            //Create token 
            let token = jwt.sign({id:user._id},config.secret,{
                expiresIn:86400
            });
            //Return auth
            return setStatusMessage(res,200,'OK').json({auth:true,token,message:"Login Successful"});
        }catch(error){
            return setStatusMessage(res,500,"Error");
        }
    },

    logout(req,res,next){
        try{
            //Returns a simple object 
            return setStatusMessage(res,200,'OK').json({auth:false,token:null,message:"Logout Successful"});
        }catch(error){
            return setStatusMessage(res,500,'Error');
        }
        
    }
}
