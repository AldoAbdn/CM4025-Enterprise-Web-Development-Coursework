module.exports.setStatusMessage = function(res, code, message){
    res.statusMessage = message;
    res.status(code);
    return res;
}