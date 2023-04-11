import React from "react";
import ApplicationStatus from "../Bundle/bundleDesign/ApplicationStatus";
import RequestStatus from "../Bundle/bundleDesign/RequestStatus";
import { useState } from "react";
import "./Application.scss";
import { Link } from "@material-ui/core";

export default function History() {
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
        
        <Link onClick={AppstatusView} 
           href="" 
           style={{ textDecoration: appStatus ? 'underline' : undefined }}>
           Application Status 
        </Link>
        <Link
          onClick={ReqstatusView}
          href=""
          style={{ textDecoration: reqStatus ? 'underline' : undefined }} >
          Request Status
        </Link>
      </div>
      <div>
      {/* <ApplicationStatus /> */}
      </div>
      <div>{appStatus ? <ApplicationStatus /> : ""}</div>
      <div>{reqStatus ? <RequestStatus /> : ""}</div>
      
    </div>
  );
}
