import React, { Component } from "react";
import openSocket from 'socket.io-client'
import { startAction, formUpdate, initComposer } from '../actions/composer'
import { connect } from 'react-redux'

class Grafana extends Component {
   
    constructor(props) {
        super(props);
        const socket = openSocket('https://vpp-demo.infiswift.tech');
        this.socket = socket
      }
       componentDidMount() {
       
      }

    render() {

        return (
           <iframe src="http://34.232.85.241:3000/d/000000010/preview-platform-cluster?orgId=1&panelId=12&fullscreen&from=1565738020590&to=1565824420590&theme=light" 
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
