import React from 'react';
import Button from "@material-ui/core/Button";
import { useState } from 'react';
import ApplicationStatus from './ApplicationStatus';

export default function RequestStatus() {
  const [clicked, setclicked] = useState(false);

  const Reqtable = {
    paddingRight : "360px"
  };
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
    setclicked(true);
  };
 
  return (
    <table className="table table-striped bt-0" >
  <thead >
    <tr >
      <th  scope="col" style={Reqtable} >Request Name</th>
      <th  scope="col">Status</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">form one</th>
      <Button style={Statusbutton}>Completed</Button>
      <td style={arrow}>  
      <i className="fa fa-chevron-down" onClick={statusExpand}></i>
      </td>
    </tr>
    <tr>
    {
      clicked ? <ApplicationStatus/> : "" 
    }
    </tr>
    
    <tr>
      <th scope="row">form two</th>
      <Button style={Statusbutton}>Completed</Button>
      <td style={arrow} >
      <i className="fa fa-chevron-down"></i>
      </td>
    </tr>
    
  </tbody>
</table>
  );
}

