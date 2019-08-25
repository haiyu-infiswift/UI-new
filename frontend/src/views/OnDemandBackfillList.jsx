import React, { Component } from "react";

class listOnDemandBackfill extends Component {
    
      
    render() {
        const { id,start_time,end_time,interval_num,status} = this.props
    

        return (
                <tr id={id}>
                    <td>{id}</td>
                    <td>{start_time} </td>
                    <td>{end_time}  </td>
                    <td>{interval_num}</td>
                    <td>{status}</td>
                </tr>
        );
    }
}
export default listOnDemandBackfill;