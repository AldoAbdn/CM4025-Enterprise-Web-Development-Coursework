import React, { Component } from 'react';
import { Route } from 'react-router'
import { Redirect } from 'react-router-dom';

/**
 * @class ProtectedRoute
 * @description Component that prevents navigation to a route that requires auth
 */
class ProtectedRoute extends Component {
    /**
    * @function render
    * @description React lifecycle method, returns visible part of Login component 
    */
    render(){
        if (this.props.loggedIn){
            return (<Route {...this.props}/>)
        } else {
            return (<Redirect to='/login' state={this.props.location}/>)
        }
    }
}

export default ProtectedRoute;