import React, { Component } from "react";
import List from "./DownsamplingList";
import PageButton from "./PageButton";
import { Table } from "react-bootstrap";
import { Grid, Row, Col } from "react-bootstrap";
import Card from "components/Card/Card.jsx";

import openSocket from 'socket.io-client'
import { startAction, formUpdate, initComposer } from '../../actions/composer'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'


class downsamplingError extends Component {
   
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
          pageSize:13, 
          goValue:0, 
          totalPage:0,
        };
      }
      componentDidMount() {
        fetch('http://localhost:8080/downsamplingError')
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

    render() {
        if (!localStorage.getItem('token'))
        return <Redirect to="/Login" />;

        return (
                    <Grid>
                    <Row>
                    <Col lg={12} sm={12}>
                    <Card
                        title="Downsampling error check"
                        category="Record downsampling error of 5min, 15min, 1hr, 4hr"
                        ctTableFullWidth
                        ctTableResponsive
                        content={
                        <Table>
                        <thead>
                            <tr>
                              <td>id</td>
                              <td>project_id</td>
                              <td>start_time</td>
                              <td>end_time</td>
                              <td>solved</td>
                              <td>equipment</td>
                              <td>interval_num</td>
                            </tr>
                          </thead>
                            <tbody>
                                {this.state.indexList.map(function (cont) {
                                    return <List {...cont} />
                                })}
                            </tbody>
                        <PageButton { ...this.state } pageNext={this.pageNext} />
                         </Table> 
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
        downsamplingError: state.downsamplingError
    }
}

export default connect(mapStateToProps, { startAction, formUpdate, initComposer })(downsamplingError)
