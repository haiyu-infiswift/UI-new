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
import { Grid, Row, Col } from "react-bootstrap";

import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import openSocket from 'socket.io-client'
import { startAction, formUpdate, initComposer } from '../actions/composer'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class Dashboard extends Component {
  constructor(props) {
    super(props);
    const socket = openSocket('https://vpp-demo.infiswift.tech');
        this.socket = socket
    this.state = {
      loginStatus: [],
      fiveMinStatus:[],
      fifteenMinStatus:[],
      oneHourStatus:[],
      fourHourStatus:[],
      backfillStatus:[],
      APIInverterInsertStatus:[],
      APIGetGraphDataStatus:[]
    };
  }
  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }

 componentDidMount() {
      
  setInterval(() => {
    fetch("http://localhost:8080/loginStatus")
      .then(res => res.json())
      .then((data) => {
        this.setState({ loginStatus: data })
      })
      .catch(console.log)

      fetch("http://localhost:8080/fiveMinStatus")
      .then(res => res.json())
      .then((data) => {
        this.setState({ fiveMinStatus: data })
      })

      .catch(console.log)
      fetch("http://localhost:8080/fifteenMinStatus")
      .then(res => res.json())
      .then((data) => {
        this.setState({ fifteenMinStatus: data })
      })
      .catch(console.log)

      fetch("http://localhost:8080/oneHourStatus")
      .then(res => res.json())
      .then((data) => {
        this.setState({ oneHourStatus: data })
      })
      .catch(console.log)

      fetch("http://localhost:8080/fourHourStatus")
      .then(res => res.json())
      .then((data) => {
        this.setState({ fourHourStatus: data })
      })
      .catch(console.log)

      fetch("http://localhost:8080/backfillStatus")
      .then(res => res.json())
      .then((data) => {
        this.setState({ backfillStatus: data })
      })
      .catch(console.log)

      fetch("http://localhost:8080/APIInverterInsertStatus")
      .then(res => res.json())
      .then((data) => {
        this.setState({ APIInverterInsertStatus: data })
      })
      .catch(console.log)

      fetch("http://localhost:8080/APIGetGraphDataStatus")
      .then(res => res.json())
      .then((data) => {
        this.setState({ APIGetGraphDataStatus: data })
      })
      .catch(console.log)
}, 1000);
  }


  render() {
    if (!localStorage.getItem('token'))
    return <Redirect to="/Login" />;
    const loginstatus = this.state.loginStatus;
    var login_start_time = null;
    var login_end_time = null;
    var login_status = null;
    var icon_selection_login=null;

    const fivestatus = this.state.fiveMinStatus;
    var five_start_time = null;
    var five_end_time = null;
    var five_status = null;
    var icon_selection_five = null;

    const fifteenstatus = this.state.fifteenMinStatus;
    var fifteen_start_time = null;
    var fifteen_end_time = null;
    var fifteen_status = null;
    var icon_selection_fifteen = null;

    const onehourstatus = this.state.oneHourStatus;
    var onehour_start_time = null;
    var onehour_end_time = null;
    var onehour_status = null;
    var icon_selection_onehour = null;

    const fourhourstatus = this.state.fourHourStatus;
    var fourhour_start_time = null;
    var fourhour_end_time = null;
    var fourhour_status = null;
    var icon_selection_fourhour = null;

    const backfillstatus = this.state.backfillStatus;
    var backfill_start_time = null;
    var backfill_end_time = null;
    var backfill_status = null;
    var icon_selection_backfill = null;

    const APIInverterInsertStatus = this.state.APIInverterInsertStatus;
    var APIInverterInsertStatus_start_time = null;
    var APIInverterInsertStatus_end_time = null;
    var APIInverterInsertStatus_status = null;
    var icon_selection_APIInverterInsertStatus = null;
    
    const APIGetGraphDataStatus = this.state.APIGetGraphDataStatus;
    var APIGetGraphDataStatus_start_time = null;
    var APIGetGraphDataStatus_end_time = null;
    var APIGetGraphDataStatus_status = null;
    var icon_selection_APIGetGraphDataStatus = null;



    if(loginstatus != null && loginstatus.length !== 0){
      let myJSON = JSON.stringify(loginstatus);
      let obj = JSON.parse(myJSON);
      login_start_time = obj[0].start_time;
      login_end_time = obj[0].end_time;
      login_status = obj[0].status;
      if(login_status ==="true"){
        icon_selection_login="pe-7s-check text-success";
      }else{
        icon_selection_login="pe-7s-close-circle text-danger";
      }
    }

    if(fivestatus != null && fivestatus.length !== 0){
      let myJSON = JSON.stringify(fivestatus);
      let obj = JSON.parse(myJSON);
      five_start_time = obj[0].start_time;
      five_end_time = obj[0].end_time;
      five_status = obj[0].status;
      if(five_status ==="true"){
        icon_selection_five="pe-7s-check text-success";
      }else{
        icon_selection_five="pe-7s-close-circle text-danger";
      }
    }

    if(fifteenstatus != null && fifteenstatus.length !== 0){
      let myJSON = JSON.stringify(fifteenstatus);
      let obj = JSON.parse(myJSON);
      fifteen_start_time = obj[0].start_time;
      fifteen_end_time = obj[0].end_time;
      fifteen_status = obj[0].status;
      if(fifteen_status ==="true"){
        icon_selection_fifteen="pe-7s-check text-success";
      }else{
        icon_selection_fifteen="pe-7s-close-circle text-danger";
      }
    }

    if(onehourstatus != null && onehourstatus.length !== 0){
      let myJSON = JSON.stringify(onehourstatus);
      let obj = JSON.parse(myJSON);
      onehour_start_time = obj[0].start_time;
      onehour_end_time = obj[0].end_time;
      onehour_status = obj[0].status;
      if(onehour_status ==="true"){
        icon_selection_onehour="pe-7s-check text-success";
      }else{
        icon_selection_onehour="pe-7s-close-circle text-danger";
      }
    }

    if(fourhourstatus != null && fourhourstatus.length !== 0){
      let myJSON = JSON.stringify(fourhourstatus);
      let obj = JSON.parse(myJSON);
      fourhour_start_time = obj[0].start_time;
      fourhour_end_time = obj[0].end_time;
      fourhour_status = obj[0].status;
      if(fourhour_status ==="true"){
        icon_selection_fourhour="pe-7s-check text-success";
      }else{
        icon_selection_fourhour="pe-7s-close-circle text-danger";
      }
    }

    if(backfillstatus != null && backfillstatus.length !== 0){
      let myJSON = JSON.stringify(backfillstatus);
      let obj = JSON.parse(myJSON);
      backfill_start_time = obj[0].start_time;
      backfill_end_time = obj[0].end_time;
      backfill_status = obj[0].status;
      if(backfill_status ==="true"){
        icon_selection_backfill="pe-7s-check text-success";
      }else{
        icon_selection_backfill="pe-7s-close-circle text-danger";
      }
    }

    if(APIInverterInsertStatus!= null && APIInverterInsertStatus.length !== 0){
      let myJSON = JSON.stringify(APIInverterInsertStatus);
      let obj = JSON.parse(myJSON);
      APIInverterInsertStatus_start_time = obj[0].start_time;
      APIInverterInsertStatus_end_time = obj[0].end_time;
      APIInverterInsertStatus_status = obj[0].status;
      if(APIInverterInsertStatus_status ==="true"){
        icon_selection_APIInverterInsertStatus="pe-7s-check text-success";
      }else{
        icon_selection_APIInverterInsertStatus="pe-7s-close-circle text-danger";
      }
    }
    
    if(APIGetGraphDataStatus!= null && APIGetGraphDataStatus.length !== 0){
      let myJSON = JSON.stringify(APIGetGraphDataStatus);
      let obj = JSON.parse(myJSON);
      APIGetGraphDataStatus_start_time = obj[0].start_time;
      APIGetGraphDataStatus_end_time = obj[0].end_time;
      APIGetGraphDataStatus_status = obj[0].status;
      if(APIGetGraphDataStatus_status ==="true"){
        icon_selection_APIGetGraphDataStatus="pe-7s-check text-success";
      }else{
        icon_selection_APIGetGraphDataStatus="pe-7s-close-circle text-danger";
      }
    }
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={6} sm={6}> 
              <a href="/preview/loginFailure">   
              <StatsCard 
                bigIcon={<i className="pe-7s-id text-success" />}
                selectIcon={<i className={icon_selection_login} />}
                statsText="User login check"
                statsValue={<i className="fa fa-calendar-o" />}
                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText={"From " + login_start_time + " to " + login_end_time + " JST"}
              />
              </a>
            </Col>
            <Col lg={6} sm={6}>
             <a href="/preview/downsamplingError">   
              <StatsCard
                bigIcon={<i className="pe-7s-wallet text-warning" />}
                selectIcon={<i className={icon_selection_five} />}
                statsText="5min downsampling check"
                statsValue="$1,345"
                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText={"From " + five_start_time + " to " + five_end_time + " JST"}
              />
              </a>
            </Col>
            </Row>
            <Row>
            <Col lg={6} sm={6}>
            <a href="/preview/downsamplingError">  
              <StatsCard
                bigIcon={<i className="pe-7s-wallet text-warning" />}
                selectIcon={<i className={icon_selection_fifteen} />}
                statsText="15min downsampling check"
                statsValue="23"
                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText={"From " + fifteen_start_time + " to " + fifteen_end_time + " JST"}
              />
              </a>
            </Col>
            <Col lg={6} sm={6}>
              <a href="/preview/downsamplingError">  
              <StatsCard
                bigIcon={<i className="pe-7s-wallet text-warning" />}
                selectIcon={<i className={icon_selection_onehour} />}
                statsText="1hr downsampling check"
                statsValue="23"
                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText={"From " + onehour_start_time + " to " + onehour_end_time + " JST"}
              />
              </a>
            </Col>
          </Row>
          <Row>
            <Col lg={6} sm={6}>
              <a href="/preview/downsamplingError">  
              <StatsCard
                bigIcon={<i className="pe-7s-wallet text-warning" />}
                selectIcon={<i className={icon_selection_fourhour} />}
                statsText="4hr downsampling check"
                statsValue="23"
                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText={"From " + fourhour_start_time + " to " + fourhour_end_time + " JST"}
              />
              </a>
            </Col>
            <Col lg={6} sm={6}>
            <a href="/preview/backfillFailure">  
              <StatsCard
                bigIcon={<i className="pe-7s-tools text-danger" />}
                selectIcon={<i className={icon_selection_backfill} />}
                statsText="Backfill status check"
                statsValue="23"
                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText={"From " + backfill_start_time + " to " + backfill_end_time + " JST"}
              />
              </a>
            </Col>
          </Row>
          <Row>
            <Col lg={6} sm={6}>
              <a href="/preview/APItesting">  
              <StatsCard
                bigIcon={<i className="pe-7s-share text-success" />}
                selectIcon={<i className={icon_selection_APIInverterInsertStatus} />}
                statsText="Inverter Insert Equipment"
                statsValue="23"
                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText={"From " + APIInverterInsertStatus_start_time + " to " + APIInverterInsertStatus_end_time + " JST"}
              />
              </a>
            </Col>
            <Col lg={6} sm={6}>
              <a href="/preview/APItesting">  
              <StatsCard
                bigIcon={<i className="pe-7s-share text-success" />}
                selectIcon={<i className={icon_selection_APIGetGraphDataStatus} />}
                statsText="Get Graph Data"
                statsValue="23"
                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText={"From " + APIGetGraphDataStatus_start_time + " to " + APIGetGraphDataStatus_end_time + " JST"}
              />
              </a>
            </Col>
          </Row>
          

        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dashboard: state.dashboard
  }
}

export default connect(mapStateToProps, { startAction, formUpdate, initComposer })(Dashboard)

//export default Dashboard;
