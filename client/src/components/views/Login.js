import React from 'react';
import authController from '../../controllers/authController';
import {Link} from 'react-router-dom';
import security from '../../security/security';

/**
 * @class Login
 * @description This is an auth view for logging a user in 
 */
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username:"", password:"", errorMessage:"" };
  }
  /**
  * @function handleSubmit
  * @description Handles form submit, makes call to auth controller 
  * @param {event} e submit event 
  * @async
  */
  handleSubmit = async (e) => {
    this.props.setLoading({login:true});
    e.preventDefault();
    let credentials = security.sanitize({username:this.state.username,password:this.state.password}); //Removes any $ to prevent non sql injection 
    try{
      let auth = await authController.login(credentials); //Call to server to auth credentials using controller 
      this.props.handleSubmit(auth); //Gives auth to App 
      this.setState({errorMessage:auth.message}); //If unsucessful show message 
    }catch(error){
      this.setState({errorMessage:error.message});
    }
    this.props.setLoading({login:false});
  }

  /**
    * @function handleOnChange
    * @description Handles input onChange event, updates state  
    * @param {event} e submit event 
    */
  handleOnChange = (e) => {
      this.setState({
          [e.target.id]: e.target.value //Sets state based on inputs current value 
      })
  }

  /**
    * @function render
    * @description React lifecycle method, returns visible part of component 
    */
  render() {
    let errorMessage;
    if(this.state.errorMessage!==""){
      errorMessage = <p className="alert alert-danger">{this.state.errorMessage}</p>
    }
    return (
      <form id="loginForm" onSubmit={(event)=>this.handleSubmit(event)}>
        <div className="form-group">
          <input className="form-control" type="text" id="username" value={this.state.username} onChange={this.handleOnChange} placeholder="Username"/>
          <input className="form-control" type="password" id="password" value={this.state.password} onChange={this.handleOnChange} placeholder="Password"/>
          <button className="btn btn-primary btn-block" type="submit">Login</button>
          <Link to="/signup">Don't have an account? Sign Up Here</Link>
        </div>
        {errorMessage}
      </form>
    );
  }
}

export default Login;
