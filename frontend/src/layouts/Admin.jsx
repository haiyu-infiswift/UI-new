/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";


import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";

import routesPrev from "routesPrev";
import routesProd from "routesProd.js";

import image from "assets/img/sidebar-3.jpg";

//import login from "LoginPage/LoginPage";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode_status:'',
      _notificationSystem: null,
      image: image,
      color: "black",
      hasImage: true,
      fixedClasses: "dropdown show-dropdown open"
    };
  }

  
            getRoutesPrev = routesPrev => {
             
              return routesPrev.map((prop, key) => {
                
                if (prop.layout === "/preview") {
                  return (
                    <Route
                      path={prop.layout + prop.path}
                      render={props => (
                        <prop.component
                          {...props}
                          handleClick={this.handleNotificationClick}
                        />
                      )}
                      key={key}
                    />
                  );
                } else if(prop.layout === "/production"){
                  return (
                    <Route
                      path={prop.layout + prop.path}
                      render={props => (
                        <prop.component
                          {...props}
                          handleClick={this.handleNotificationClick}
                        />
                      )}
                      key={key}
                    />
                  );
                }else {
                  return null;
                }
              });
        
          };


          getRoutesProd = routesProd => {
             
            return routesProd.map((prop, key) => {
              
              if (prop.layout === "/preview") {
                return (
                  <Route
                    path={prop.layout + prop.path}
                    render={props => (
                      <prop.component
                        {...props}
                        handleClick={this.handleNotificationClick}
                      />
                    )}
                    key={key}
                  />
                );
              } else if(prop.layout === "/production"){
                return (
                  <Route
                    path={prop.layout + prop.path}
                    render={props => (
                      <prop.component
                        {...props}
                        handleClick={this.handleNotificationClick}
                      />
                    )}
                    key={key}
                  />
                );
              }else {
                return null;
              }
            });
      
        };
        
        getBrandTextPrev = path => {
          for (let i = 0; i < routesPrev.length; i++) {
            if (
              this.props.location.pathname.indexOf(
                routesPrev[i].layout + routesPrev[i].path
              ) !== -1
            ) {
              return routesPrev[i].name;
            }
          }
          return "Brand";
        }; 
        
        getBrandTextProd = path => {
          for (let i = 0; i < routesProd.length; i++) {
            if (
              this.props.location.pathname.indexOf(
                routesProd[i].layout + routesProd[i].path
              ) !== -1
            ) {
              return routesProd[i].name;
            }
          }
          return "Brand";
        }; 

      handleImageClick = image => {
        this.setState({ image: image });
      };
      handleColorClick = color => {
        this.setState({ color: color });
      };
      handleHasImage = hasImage => {
        this.setState({ hasImage: hasImage });
      };
      

      componentWillMount() {
        this.renderMyData();
    }

    renderMyData(){
        fetch('http://localhost:8080/loginMode')
            .then((response) => response.json())
            .then((data) => {
              this.setState({ mode_status : data[0].mode })
            })
            .catch((error) => {
              console.error(error);
            });
    }

  render() {
    console.log(this.state.mode_status === "preview");
    if(this.state.mode_status === "preview"){
      return (

        <div className="wrapper">
          <Sidebar {...this.props} routes={routesPrev} image={this.state.image}
          color={this.state.color}
          hasImage={this.state.hasImage}/>
          <div id="main-panel" className="main-panel" ref="mainPanel">
            <AdminNavbar
              {...this.props}
              brandText={this.getBrandTextPrev(this.props.location.pathname)}
            />
            <Switch>{this.getRoutesPrev(routesPrev)}</Switch>
            <Footer />
          </div>
        </div>
      );
    }else{
      return (

        <div className="wrapper">
          <Sidebar {...this.props} routes={routesProd} image={this.state.image}
          color={this.state.color}
          hasImage={this.state.hasImage}/>
          <div id="main-panel" className="main-panel" ref="mainPanel">
            <AdminNavbar
              {...this.props}
             brandText={this.getBrandTextProd(this.props.location.pathname)}
            />
            <Switch>{this.getRoutesProd(routesProd)}</Switch>
            <Footer />
          </div>
        </div>
      );
    }
   
    
  }
}

export default Admin;
