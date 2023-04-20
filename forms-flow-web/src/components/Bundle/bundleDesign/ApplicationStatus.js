import { Box, Link, Typography } from "@material-ui/core";
import React from "react";
import HistoryStepper from "./HistoryStepper";

export default function ApplicationStatus(props) {
  const application = props.application;
  const [date, time] = application.created.split(" ");
 
  const containerStyle = {
    display: "flex",
    gap: "98px",
    // paddingLeft: '35px',
  };
  const ptag = {
    margin: "0",
  };

  const applicationdetails = {
    display: "flex",
    flexDirection: "column",
    gap: "35px",
  };
  return (
    <Box style={{ display: "flex" }}>
      <HistoryStepper />
      <div style={applicationdetails}>
        <div style={containerStyle}>
          <div>
            <Typography className="" style={ptag}>
              {" "}
              <span style={{ fontWeight: "bold" }}>{date}</span><br></br>{time}
            </Typography>
          </div>
          <div>
            <Typography style={ptag}>
              <span style={{ fontWeight: "bold" }}> Submitted</span> New
              Business License Application{" "}
              <span style={{ fontWeight: "bold" }}>
                {application.createdBy}
              </span>
            </Typography>
          </div>
          <div>
            <Link href="#">View Submission</Link>
            {/* <i className="fa fa-arrow-up-right-from-square "></i> */}
          </div>
        </div>
      </div>
    </Box>
  );
}
