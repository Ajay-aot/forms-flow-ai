import { Link, Typography } from "@material-ui/core";
import React from "react";
// import BundleStepper from './HistoryStepper';

export default function ApplicationStatus() {
  const containerStyle = {
    display: 'flex',
    gap:"130px",
    // paddingLeft: '35px',
};
const ptag = {
   margin:"0"
};

  return (
      <div style={containerStyle}>
            {/* <BundleStepper/> */}
            <div>
             <Typography className="" style={ptag}> <span style={{ fontWeight: 'bold' }}>3/22/2023,</span> <br></br>11:37:44 am</Typography>
            </div>
            <div>
            <Typography  style={ptag}>
            <span style={{ fontWeight: 'bold' }}> Submitted</span> New Business License Application <span style={{ fontWeight: 'bold' }}>John.honai</span>
            </Typography>
            </ div>
            <div>
            <Link style={{ fontWeight: '' }}
             href="#">
                 View Submission
            </Link> 
           </div>
            
    </div>
  );
}
