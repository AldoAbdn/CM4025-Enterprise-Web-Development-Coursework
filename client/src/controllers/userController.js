import Controller from './controller';

/**
 * @class UserController 
 * @description User Controller for getting and updating user 
 */
class UserController extends Controller {
    constructor(){
        super("/api/user/")
    }

    async getDetails(token){
      let response = await fetch(this.path+"getDetails", {
        method:'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      });
      return response.json();
    }

    async addFeed(feedSource, token){
      let response = await fetch(this.path+"addFeed", {
        method:'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        body:JSON.stringify({feedSource})
      });
      return response.json();
    }

    async removeFeed(feedSource,token){
      let response = await fetch(this.path+"removeFeed", {
        method:'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        body:JSON.stringify({feedSource})
      });
      return response.json();
    }
}

export default new UserController();