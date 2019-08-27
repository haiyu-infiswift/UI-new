import React, { Component } from "react";

class listOnDemandBackfill extends Component {
    
    render() {
        const { id,setting,inserted_time,status} = this.props
    
        return (
                <tr id={id}>
                    <td>{id}</td>
                    <td>{setting} </td>
                    <td>{inserted_time}  </td>
                    <td>{status}</td>
                </tr>
        );
    }
}
export default listOnDemandBackfill;