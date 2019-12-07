/**
 * @module userModel
 * @description Model for accessing mongo db users collection 
 */
var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    username: String,
    password: {type:String, select:false},
    feedSources: Array,
    login: {type: Date, default: Date.now},
    lastLogin: {type: Date, default: new Date(0)}
});
module.exports = mongoose.model('users', userSchema);
