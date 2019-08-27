import React, { Component } from "react";

class listLogin extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          downsamplingErrors:[]
        };
      }

      
    render() {
        const { id,start_time,end_time,inserted_time,api_name } = this.props
        
        return (
                <tr id={id}>
                    <td>{id}</td>
                    <td>{start_time} </td>
                    <td>{end_time}  </td>
                    <td>{inserted_time}</td>
                    <td>{api_name}</td>
                </tr>
        );
    }
}
export default listLogin;