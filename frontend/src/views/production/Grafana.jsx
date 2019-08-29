import React, { Component } from "react";
import openSocket from 'socket.io-client'
import { startAction, formUpdate, initComposer } from '../../actions/composer'
import { connect } from 'react-redux'

class Grafana extends Component {
   
    constructor(props) {
        super(props);
        const socket = openSocket('https://vpp-demo.infiswift.tech');
        this.socket = socket
      }
    
    render() {
        return (
           <iframe src="http://34.232.85.241:3000/d/000000011/hien-production-dashboard?orgId=1&panelId=12&fullscreen&from=1566889200000&to=1566975599999&theme=light" 
           width="1150" height="1150" frameborder="0">
           </iframe>    
        );
    }
}

const mapStateToProps = (state) => {
    return {
      grafana: state.grafana
    }
  }
  
  export default connect(mapStateToProps, { startAction, formUpdate, initComposer })(Grafana)
