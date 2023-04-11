import React from 'react';
import Button from "@material-ui/core/Button";
export default function RequestStatus() {
  const Reqtable = {
    paddingLeft :"385px",
    paddingRight : "150px"
  };
  const arrow = {
    paddingInline : "80px"
  };
 
  return (
    <table className="table table-striped" >
  <thead >
    <tr >
      <th  scope="col" >Request Name</th>
      <th  scope="col" style={Reqtable} >Status</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">form one</th>
      <td style={Reqtable}>Mark</td>
      <td style={arrow}></td>
    </tr>
    <tr>
      <th scope="row">form two</th>
      <Button>Completed</Button>
      <span className="material-icons-outlined" style={arrow}></span>
    </tr>
    
  </tbody>
</table>
  );
}

