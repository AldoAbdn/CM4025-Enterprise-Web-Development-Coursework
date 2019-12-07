/**
 * This isn't an actual model, but a representation of what the authController returns
 * This is because tokens are created and sent and not stored in the server 
 */
class Auth{
    constructor(auth=true,token="",message=""){
        this.auth = auth;
        this.token = token;
        this.message = message;
    }
}