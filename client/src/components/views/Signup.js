import React from 'react';
import authController from '../../controllers/authController';
import {Link} from 'react-router-dom';
import security from '../../security/security';

/**
 * @class SignUp
 * @description This is an auth view for sign up
 */
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username:"",password:"",password2:"",errorMessage:"" };
  }

  /**
  * @function handleSubmit
  * @description Handles form submit, makes call to auth controller 
  * @param {event} e submit event 
  * @async
  */
  handleSubmit = async (e) => {
    this.props.setLoading({signup:true});
    e.preventDefault();
    if(this.state.password!==this.state.password2){
        this.setState({errorMessage:"Passwords must match"});
        return;
    }
    let credentials = security.sanitize({username:this.state.username,password:this.state.password});
    try{
      let auth = await authController.signup(credentials);
      this.props.handleSubmit(auth);
      this.setState({errorMessage:auth.message});
    }catch(error){
      this.setState({errorMessage:error.message});
    }
    this.props.setLoading({signup:false});
  }

  /**
    * @function handleOnChange
    * @description Handles input onChange event, updates state  
    * @param {event} e submit event 
    */
  handleOnChange = (e) => { 
    this.setState({
        [e.target.id]: e.target.value
    },()=>{
        if(this.state.password!==this.state.password2){
            this.setState({errorMessage:"Passwords do not match"});
        } else {
            this.setState({errorMessage:""});
        }
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
          <input className="form-control" type="password" id="password2" value={this.state.password2} onChange={this.handleOnChange} placeholder="Re-Type Password"/>
          <button className="btn btn-primary btn-block" type="submit">Sign Up</button>
          <Link to="/login">Have an Account? Log In Here</Link>
        </div>
        {errorMessage}
      </form>
    );
  }
}

export default Signup;
