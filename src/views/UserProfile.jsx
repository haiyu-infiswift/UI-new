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

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginFailures:[]
    };
  }

  componentDidMount() {
    fetch('http://localhost:8080/loginFailure')
    .then(res => res.json())
    .then((data) => {
      this.setState({ loginFailures: data })
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
                title="Real-time Login Failure Table"
                category="Real-time user login failures"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table>
                    <thead>
                        <tr>
                          <td>inserted_time</td>
                          <td>error_message</td>
                          <td>error_code</td>
                        </tr>
                      </thead>
                    <tbody>
                        {this.state.loginFailures.map((loginFailure) => (
                          <tr key={loginFailure.inserted_time}>
                          <td>{loginFailure.inserted_time}</td>
                          <td>{loginFailure.error_message}</td>
                          <td>{loginFailure.errorCode}</td>
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

export default UserProfile;
