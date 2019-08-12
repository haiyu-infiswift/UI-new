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

class TableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      downsamplingErrors:[]
    };
  }
  componentDidMount() {
    fetch('http://localhost:8080/downsamplingError')
    .then(res => res.json())
    .then((data) => {
      this.setState({ downsamplingErrors: data })
    })
    .catch(console.log)
}
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Real-time Downsampling Error Table"
                category="Record downsampling errors of 5min, 15min, 1hr, 4hr"
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
                          <td>solved</td>
                        </tr>
                      </thead>
                    <tbody>
                        {this.state.downsamplingErrors.map((downsamplingError) => (
                          <tr key={downsamplingError.project_id}>
                          <td>{downsamplingError.project_id}</td>
                          <td>{downsamplingError.start_time}</td>
                          <td>{downsamplingError.end_time}</td>
                          <td>{downsamplingError.equipment}</td>
                          <td>{downsamplingError.interval_num}</td>
                          <td>{downsamplingError.solved}</td>
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

export default TableList;
