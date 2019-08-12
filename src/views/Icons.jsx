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
import { Grid, Row, Col, Table } from "react-bootstrap";

import Card from "components/Card/Card.jsx";

class Icons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      APIFailures:[]
    };
  }
  componentDidMount() {
    fetch('http://localhost:8080/apiStatus')
    .then(res => res.json())
    .then((data) => {
      this.setState({ APIFailures: data })
    })
    .catch(console.log)
}

renderUserMessage(){
  if (true) {
    return (
  
    <h2>welcome</h2>
    );
    }
  }
  

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="API Failure Table"
                category="Show API failures"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table>
                    <thead>
                        <tr>
                          <td>api_name</td>
                          <td>start_time</td>
                          <td>end_time</td>
                          <td>intert_time</td>
                        </tr>
                      </thead>
                    <tbody>
                        {this.state.APIFailures.map((APIFailure) => (
                          <tr key={APIFailure.api_name}>
                          <td>{APIFailure.api_name}</td>
                          <td>{APIFailure.start_time}</td>
                          <td>{APIFailure.end_time}</td>
                          <td>{APIFailure.inserted_time}</td>
                        </tr>
                        
                        ))}
                    </tbody>
                    </Table>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Icons;
