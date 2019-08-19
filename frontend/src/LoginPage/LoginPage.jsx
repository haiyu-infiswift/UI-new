import { Link } from 'react-router-dom';

import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { callLogin, formUpdate } from '../actions/authAction'
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";


class LoginPage extends React.Component {
  
    loginSubmit() {
        this.props.callLogin(this.props.auth.email, this.props.auth.password);
    }
  
       
    render() {
        if (localStorage.getItem('token'))
        return <Redirect to="/admin/dashboard" />;
        return (
            <div className="col-md-6 col-md-offset-7">
                 <div className = "col-xs-12 form-group">
                 <div className = "col-xs-4">
                 <span className="input-group-text">
                    <i></i>
                 </span>
                 </div>
                 </div>
                <div class="col-xs-12 form-group">
                 <div class = "col-xs-4">
                 <h2>Login</h2>
                 </div>
                </div>
                <div className="infi-login">
                <div className="login">
                <div className="login-form">
                    <form action="" onSubmit={(event) => {
                        event.preventDefault()
                        this.props.callLogin(this.props.auth.email, this.props.auth.password);
                        this.loginSubmit.bind(this)
                    }}>
                       <div className = "col-xs-12 form-group">
                            <div className = "col-xs-8">
                              <input className="form-control form-control-sm" type="email" placeholder="Email" autoComplete="username" value={this.props.auth.email} onChange={event => this.props.formUpdate('email', event.target.value)}/>
                            </div>
                        </div>
                        <div className = "col-xs-12 form-group">
                           <div className = "col-xs-8">
                            <input className="form-control form-control-sm" type="password" placeholder="Password" autoComplete="current-password" value={this.props.auth.password} onChange={event => this.props.formUpdate('password', event.target.value)}/>
                           </div>
                        </div>
                        <div class="col-xs-12 form-group">
                        <div class = "col-xs-4">
                        <label for="sel1">Select mode:</label>
                        <select class="form-control" id="sel1">
                            <option>preview</option>
                            <option>production</option>
                        </select>
                        </div>
                        </div>
                        <div class="col-xs-12 form-group">
                        <div class = "col-xs-4">
                        <button type="submit" className="btn">Login</button>
                        </div>
                        </div>
                    </form>

               {/*    <form name="form" onSubmit={(event) => {
                        event.preventDefault()
                        this.props.callLogin(this.props.auth.email, this.props.auth.password);
                        this.loginSubmit.bind(this)
                    }}>
                    <div>
                        <label htmlFor="email">Username</label>
                        <input type="text" className="email" autoComplete="username" value={this.props.auth.email} onChange={event => this.props.formUpdate('email', event.target.value)} />
                       
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="password" autoComplete="current-password" value={this.props.auth.password} onChange={event => this.props.formUpdate('password', event.target.value)} />
                        
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" type="submit">Login</button>
                        <Link to="/register" className="btn btn-link">Register</Link>
                    </div>
                </form>*/}

                </div>
            </div>
            </div>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps, {callLogin, formUpdate})(LoginPage)



