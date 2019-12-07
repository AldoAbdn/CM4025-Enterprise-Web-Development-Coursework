import Controller from './controller';
/**
 * @class AuthController 
 * @description Auth Controller for sending events to the server 
 */
class AuthController extends Controller {
    constructor(){
        super("/api/auth/")
    }

    async signup(credentials){
      let response = await fetch(this.path+"addUser", {
        method:'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(credentials)
      });
      return response.json();
    }

    async login(credentials){
      let response = await fetch(this.path+"login", {
        method:'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(credentials)
      });
      return response.json();
    }

    async logout(){
      let response = await fetch(this.path+"logout", {
        method:'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({})
      });
      return response.json();
    }
}

export default new AuthController();