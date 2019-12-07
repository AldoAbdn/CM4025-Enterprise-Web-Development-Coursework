/**
 * @module indexController 
 * @description returns index
 */
module.exports = {
    returnIndex(req, res, next){
        res.send('/index.html');
    }
}


