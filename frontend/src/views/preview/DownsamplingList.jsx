import React, { Component } from "react";

class listLogin extends Component {
    

    constructor(props) {
        super(props);
        this.state = {
          downsamplingErrors:[]
        };
      }
      
    render() {
        const { id,project_id,start_time,end_time,solved,equipment,interval_num } = this.props
        
        return (
                <tr id={id}>
                    <td>{id}</td>
                    <td>{project_id} </td>
                    <td>{start_time}  </td>
                    <td>{end_time}</td>
                    <td>{solved}</td>
                    <td>{equipment}</td>
                    <td>{interval_num}</td>
                </tr>
        );
    }
}
export default listLogin;