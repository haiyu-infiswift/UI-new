
import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { callLogin, formUpdate } from '../actions/authAction'
import './LoginPage.css';
import search_logo from "assets/img/SysMonitor.png";



class LoginPage extends React.Component {
  
    loginSubmit() {
        this.props.callLogin(this.props.auth.email, this.props.auth.password);
    }
  
       
    render() {
        if (localStorage.getItem('token'))
        return <Redirect to="/admin/dashboard" />;
        return (
            <div>
               
                <div className="login">
                <div className="login-form">
                <div>
               
                </div>
                    <form action="" onSubmit={(event) => {
                        event.preventDefault()
                        this.props.callLogin(this.props.auth.email, this.props.auth.password);
                        this.loginSubmit.bind(this)
                    }}>

                      <div className="search"><img className="search-element" alt="search_image" src={search_logo}/></div>
                      <p class="app_title">Hien System Monitor</p>

                       <div className = "username">
                            <input className="form-control form-control-sm" type="email" placeholder="Email" autoComplete="username" value={this.props.auth.email} onChange={event => this.props.formUpdate('email', event.target.value)}/>
                        </div>
                        <div className = "password">
                            <input className="form-control form-control-sm" type="password" placeholder="Password" autoComplete="current-password" value={this.props.auth.password} onChange={event => this.props.formUpdate('password', event.target.value)}/>
                        </div>

                        <div class="form-group">
                            <div class = "selection">
                                <label for="sel1">Select mode: </label>
                                <select id="sel1">
                                    <option>preview</option>
                                    <option>production</option>
                                </select>
                            </div>
                            <div class = "signin"> 
                                <button type="submit" class = "btn">Sign in</button>
                            </div>
                        </div>

                       
                    </form>

                </div>
            </div>
              <div class = "copy-right">©2019 Infiswift Technologies Inc</div>
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



