import React from 'react';
import Button from "@material-ui/core/Button";
import { useState } from 'react';
import ApplicationStatus from './ApplicationStatus';

export default function RequestStatus(props) {
  const application = props.application;
  const [expanded, setExpanded] = useState(false);

  // const Reqtable = {
  //   paddingRight : "360px"
  // };
  const arrow = {
    paddingInline : "120px"
  };
  const Statusbutton = {
    padding : "0px",
    marginTop : "14px",
    backgroundColor: '#585858',
    color: 'white',
    borderRadius: '10px',
    paddingInline : "14px"
  };
  const statusExpand = ()=>{
    setExpanded(!expanded);
  };


 
  return (
    <table className="table table-striped bt-0" >
  <thead >
    <tr >
      <th  scope="col" style={{paddingRight: "500px" }} >Request Name</th>
      <th  scope="col" style={{ textAlign: "center" }}>Status</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">{application.applicationName}</th>
      <Button style={Statusbutton}>{application.applicationStatus}</Button>
      <td style={arrow}>  
      <i className={`fa ${expanded ? 'fa-chevron-up' : 'fa-chevron-down'}`} onClick={statusExpand}></i>
      </td>
    </tr>
    {expanded && (
          <tr>
            <td colSpan={3} style={{padding: "35px", boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)'}}>
              <ApplicationStatus application={props.application} />
            </td>
          </tr>
    )
    }
    {/* <tr>
      <th scope="row">form two</th>
      <Button style={Statusbutton}>Completed</Button>
      <td style={arrow}>
      <i className="fa fa-chevron-down"></i>
      </td>
    </tr> */}
    
  </tbody>
</table>
  );
}

