import React, { Component } from "react";

class listLogin extends Component {
    

    constructor(props) {
        super(props);
        this.state = {
          downsamplingErrors:[]
        };
      }
      
    render() {
        const { id,inserted_time,error_message,errorCode } = this.props
        
        return (
                <tr id={id}>
                    <td>{id}</td>
                    <td>{inserted_time} </td>
                    <td>{error_message}  </td>
                    <td>{errorCode}</td>
                </tr>
        );
    }
}
export default listLogin;