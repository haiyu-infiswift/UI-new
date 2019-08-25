import React, { Component } from "react";
import PageButton from "./PageButton";
import { Table } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import { Grid, Row, Col } from "react-bootstrap";
import List from "./OnDemandBackfillList";

import openSocket from 'socket.io-client'
import { startAction, formUpdate, initComposer } from '../actions/composer'
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
          start_time:'',
          end_time:'',
          status:'false',
          interval_num:''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
       
        this.sendHttpPostRequest = this.sendHttpPostRequest.bind(this);
      }

      handleSubmit(event) {

        var data={"start_time":this.state.start_time,"end_time":this.state.end_time,"interval_num":this.state.interval_num,"status":"in progress"};
        console.log(data);

        fetch('http://localhost:8080/onDemandBackfill', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(data)

          }); 

          var data1={"status":"run"};
         fetch('http://localhost:8080/onDemandBackfillControl', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(data1)
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
        setInterval(() => {
        fetch('http://localhost:8080/onDemandBackfill')
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
      }, 1000);
    }

    setPage(num){
        this.setState({
            indexList:this.state.totalData.slice(num,num + this.state.pageSize)
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
                        title="On demand backfill"
                        category="Backfill data in downsampling table for specific period of time"
                        ctTableFullWidth
                        ctTableResponsive
                        content={
                            <div>
                            <form onSubmit={this.handleSubmit}>
                            <label htmlFor="start">Start time:</label>
                            <input type="text" id="start" name="start_time" value = {this.state.start_time} onChange={this.handleInputChange("start_time")} placeholder="2019-01-01 06：00：00"></input>
                        
                            <label htmlFor="end">End time:</label>
                            <input type="text" id="end" name="end_time" value = {this.state.end_time} onChange={this.handleInputChange("end_time")} placeholder="2019-01-02 08：00：00"></input>


                            <label>Interval:</label>
                            <select value={this.state.interval_num} onChange={this.handleInputChange("interval_num")}>
                            <option value=""></option>
                            <option value="5min">5min</option>
                            <option value="15min">15min </option>
                            <option value="1hr">1hr</option>
                            <option value="4hr">4hr</option>
                            </select>

                            <input type="submit" value="Start!" />
                            </form>
                             <Table>
                             <thead>
                                 <tr>
                                   <td>id</td>
                                   <td>start_time</td>
                                   <td>end_time</td>
                                   <td>interval</td>
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

