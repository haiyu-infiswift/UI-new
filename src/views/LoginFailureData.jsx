import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";

import Card from "components/Card/Card.jsx";

class LoginFailureData extends Component {
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

}

export default LoginFailureData;