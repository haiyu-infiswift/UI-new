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

class Typography extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backfillFailures:[]
    };
  }
  componentDidMount() {
    fetch('http://localhost:8080/backfillFailureStatus')
    .then(res => res.json())
    .then((data) => {
      this.setState({ backfillFailures: data })
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
                title="Backfill Failure Table"
                category="Show backfill failures"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table>
                    <thead>
                        <tr>
                          <td>project_id</td>
                          <td>start_time</td>
                          <td>end_time</td>
                          <td>equipment</td>
                          <td>interval_num</td>
                        </tr>
                      </thead>
                    <tbody>
                        {this.state.backfillFailures.map((backfillFailure) => (
                          <tr key={backfillFailure.project_id}>
                          <td>{backfillFailure.project_id}</td>
                          <td>{backfillFailure.start_time}</td>
                          <td>{backfillFailure.end_time}</td>
                          <td>{backfillFailure.equipment}</td>
                          <td>{backfillFailure.interval_num}</td>
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

export default Typography;
