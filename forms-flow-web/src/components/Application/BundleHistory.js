import React from "react";
import RequestStatus from "../Bundle/bundleDesign/RequestStatus";
import ApplicationStatus from "../Bundle/bundleDesign/ApplicationStatus";
import { useState } from "react";
import "./Application.scss";
import {  Link } from "@material-ui/core";



export default function BundleHistory(props) {
  const [appStatus, setappStatus] = useState(false);
  const [reqStatus, setreqStatus] = useState(false);
//   const [clicked, setClicked] = useState(false);

  const AppstatusView = (event) => {
    event.preventDefault();
    setappStatus(true);
    setreqStatus(false);
    
  };
  const ReqstatusView = (event) => {
    event.preventDefault();
    setreqStatus(true);
    setappStatus(false);
    
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    borderRight: '2px solid black',
    gap:"20px",
    paddingRight: '25px',
    borderColor: '#D3D3D3'
  };

  return (
    <div className="history-panel">
      <div style={containerStyle}>
        <div>
        <i className="fas fa-file-alt"></i>
        <Link onClick={AppstatusView}
           href="" 
           style={{ textDecoration: appStatus ? 'underline' : undefined }}>
           Application Status 
        </Link>
        </div>
        
        <Link
          onClick={ReqstatusView}
          href=""
          style={{ textDecoration: reqStatus ? 'underline' : undefined }} >
          Request Status
        </Link>
      </div>
      <div>{appStatus ? <ApplicationStatus application={props.application}/> : ""}</div>
      <div>{reqStatus ? <RequestStatus application={props.application} /> : ""}</div>
      
    </div>
  );
}
