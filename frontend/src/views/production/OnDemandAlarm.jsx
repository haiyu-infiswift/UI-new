import React, { Component } from "react";
import PageButton from "./PageButton";
import { Table } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import { Grid, Row, Col } from "react-bootstrap";
import List from "./OnDemandAlarmList";

import openSocket from 'socket.io-client'
import { startAction, formUpdate, initComposer } from '../../actions/composer'
import { connect } from 'react-redux'


class onDemandBackfill extends Component {
   
    constructor(props) {
        super(props);
        const socket = openSocket('https://vpp-demo.infiswift.tech');
        this.socket = socket
        this.pageNext=this.pageNext.bind(this);
        this.setPage=this.setPage.bind(this);
        this.state = {
          totalData:[],
          indexList:[],
          current: 1, 
          pageSize:10, 
          goValue:0, 
          totalPage:0,
          setting:'low pv Index',
          inserted_time:''
        };
        this.handleSubmit = this.handleSubmit.bind(this);

        this.sendHttpPostRequest = this.sendHttpPostRequest.bind(this);
       
      }


      handleSubmit(event) {
        var date = new Date();
        var d = new Date(date.getTime() + 1000*60*60*9);
        this.state.inserted_time = d;
        var alarm_data={"setting":this.state.setting,"inserted_time":this.state.inserted_time,"status":"sent to broker"};

        fetch('http://localhost:8080/onDemandAlarm', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(alarm_data)
        });


        var trigger_data={"id":1,"status":"run"};
        fetch('http://localhost:8080/onDemandAlarmControl/1', {
            method: 'PUT',
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(trigger_data)
          }); 
      }  

      handleInputChange(property) {
        return e => {
          this.setState({
            [property]: e.target.value
          });
        };
      }

      componentDidMount() {
        fetch('http://localhost:8080/onDemandAlarm')
        .then(res => res.json())
        .then((data) => {
          this.setState({ 
              totalData: data,
         })
         
        })
        .then((data) => {
            this.setState({ 
                totalPage:Math.ceil( this.state.totalData.length/this.state.pageSize),
           })
           
           this.pageNext(this.state.goValue)
          })
        .catch(console.log)
    }

    setPage(num){
        this.setState({
            indexList:this.state.totalData.slice(num,num+this.state.pageSize)
        })
    }

    pageNext (num) {
        this.setPage(num)
    }

    sendHttpPostRequest(){

    }


    render() {

        return (
                    <Grid>
                    <Row>
                    <Col lg={12} sm={12}>

                    <Card
                        title="On demand alarm"
                        category="On demand alarm to trigger the email"
                        ctTableFullWidth
                        ctTableResponsive
                        content={
                            <div>
                            <form onSubmit={this.handleSubmit}>
                  
                            <label>Alarm type:</label>
                            <select value={this.state.setting} onChange={this.handleInputChange("setting")}>
                            <option value="lowPVIndex">low PV index</option>
                            </select>

                            <input type="submit" value="Start!" />
                            </form>
                             <Table>
                             <thead>
                                 <tr>
                                   <td>id</td>
                                   <td>setting</td>
                                   <td>inserted_time</td>
                                   <td>status</td>
                                 </tr>
                               </thead>
                                 <tbody>
                                     {this.state.indexList.map(function (cont) {
                                         return <List {...cont} />
                                     })}
                                 </tbody>
                             <PageButton { ...this.state } pageNext={this.pageNext} />
                              </Table> 
                            </div>
                        }
                     />
                     </Col>
                     </Row>
                     </Grid>
               
        );
    }
}
const mapStateToProps = (state) => {
    return {
        onDemandBackfill: state.onDemandBackfill
    }
}

export default connect(mapStateToProps, { startAction, formUpdate, initComposer })(onDemandBackfill)

