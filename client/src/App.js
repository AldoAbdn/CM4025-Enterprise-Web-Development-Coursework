import React from 'react';
import { Route, Switch } from 'react-router';
import { Redirect } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';
import Login from './components/views/Login';
import Signup from './components/views/Signup';
import { withRouter } from 'react-router'
import './App.css';
import authController from './controllers/authController';

/**
 * @class App
 * @description Main app component 
 */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { auth:{token:""}, loading:{login:false,signup:false,manageFeedSources:false,viewFeeds:false} };
  }

  /**
   * @function componentDidMount
   * @description React lifecycle method. Checks if auth exists
   */
  componentDidMount(){
    let auth;
    //Try to parse stored auth
    try{
      auth = JSON.parse(localStorage.getItem('auth'));
    }catch{
      auth = null;
    }
    if (auth!=undefined && auth!=null){ //Is successful store and navigate
      this.setState({auth},()=>{
        this.props.history.push("/dashboard");
      });
    }
  }

  /**
   * @function handleSubmit
   * @description Sets auth when login or sign up occurs, if successful navigates to dashboard 
   * @param {Object} auth auth returned from server 
   */
  handleSubmit = (auth) =>{ 
    this.setState({auth},()=>{
      localStorage.setItem('auth',JSON.stringify(auth));//Store auth to persist login 
      if(this.state.auth.auth)
        this.props.history.push("/dashboard");
    });
  }

  /**
   * @function handleLogoutClick
   * @async
   * @description Logs out user 
   * @param {event} e click event 
   */ 
  handleLogoutClick = async (e)=>{
    e.preventDefault();
    const response = await authController.logout();
    localStorage.removeItem('auth');//Remove auth
    this.setState({auth:response});
  }

  /**
   * @function setLoading
   * @description helper function to show a loading spinner 
   */
  setLoading = (loading)=>{
    this.setState({loading:{...this.state.loading,...loading}});
  }

  /**
  * @function render
  * @description React lifecycle method, returns visible part of Login component 
  */
  render() {
    //Check if loading, and if yes renders a spinner 
    let loading = false;
    for(let key in this.state.loading){
      if(this.state.loading[key]){
        loading = this.state.loading[key];
      }
    }
    if(loading){
      loading = (
      <div id="loading">
        <div class="lds-ripple"><div></div><div></div></div>
      </div>)
    } else {
      loading = null;
    }
    return (
      <div id="container">
        {loading}
        <div className="container">
          <div className="row">
            <div className="col-sm-2"></div>
            <div className="col-sm-8">
              <Switch>
                <Redirect exact from="/" to="dashboard"/>
                <ProtectedRoute loggedIn={this.state.auth.auth} path="/dashboard" render={(routeProps) => (<Dashboard setLoading={this.setLoading} handleLogoutClick={this.handleLogoutClick} token={this.state.auth.token}/>)}/>
                <Route path="/login" render={(routeProps) => (<Login setLoading={this.setLoading} handleSubmit={this.handleSubmit}/>)}/>
                <Route path="/signup" render={(routeProps) => (<Signup setLoading={this.setLoading} handleSubmit={this.handleSubmit}/>)}/>
              </Switch>
            </div>
            <div className="col-sm-2"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(App);