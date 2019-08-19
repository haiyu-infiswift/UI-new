import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Route, Switch, Redirect } from 'react-router-dom'
import IdleTimer from 'react-idle-timer'

import AdminLayout from "layouts/Admin.jsx";
import  LoginPage  from '../LoginPage/LoginPage';
import  RegisterPage  from '../RegisterPage/RegisterPage';

import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/animate.min.css";
import "../assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "../assets/css/demo.css";
import "../assets/css/pe-icon-7-stroke.css";

class App extends Component {
    constructor(props) {
        super(props)
        this.idleTimer = null
        this.onAction = this._onAction.bind(this)
        this.onActive = this._onActive.bind(this)
        this.onIdle = this._onIdle.bind(this)
    }
    
    render() {
        window.onbeforeunload = function() {
            localStorage.clear();
        }
        return (
            <div>
            <IdleTimer
            ref={ref => { this.idleTimer = ref }}
            element={document}
            onActive={this.onActive}
            onIdle={this.onIdle}
            onAction={this.onAction}
            debounce={250}
            timeout={1000 * 60 * 15} />  
            
            <Switch>
                <Route path="/admin" render={props => <AdminLayout {...props} />} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
                <Redirect from="/" to="/login" />
           </Switch>
            </div>
            )
        }
        _onAction(e) {
            console.log('user did something', e)
        }
        
        _onActive(e) {
            console.log('user is active', e)
            console.log('time remaining', this.idleTimer.getRemainingTime())
        }
        
        _onIdle(e) {
            console.log('user is idle', e)
            console.log('last active', this.idleTimer.getLastActiveTime())
            localStorage.clear();
            window.location = "/Login"
        }
    }
    
    const mapStateToProps = (state) => {
        return {
            auth: state.auth
        };
        
    }
    
    
    export default connect(mapStateToProps)(App)