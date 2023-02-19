import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./dashboard.css";

const MiniDashboard = (props) => {
  const [ReqID, setReqID] = useState("");
  const navigate = useNavigate();
  return (
    <>
      <h1 className="pageTitle">Dashboard</h1>
      <div className="dashBoardContainer">
        <div className="dashBoard">
          <button
            className="btn btn-primary w-100 dashButtons"
            onClick={() => navigate("/create-request")}
          >
            New Request
          </button>
          {/* <button className="btn btn-primary w-100 dashButtons">
            Register
          </button>
          <button className="btn btn-primary w-100 dashButtons">Login</button> */}
          <br />
          ❓: Chat feature will add in future.
          <br></br>
          ❓: Moderators can update the request status.
        </div>
        {localStorage.getItem("ROLES")?.includes("MODERATOR") ? (
          <div style={{ textAlign: "center" }} className="dashBoard">
            {/* <button style={{ margin: "3px" }} className="btn btn-primary">
              Request ID: {props.RequestID}
            </button> */}
            <button style={{ margin: "3px" }} className="btn btn-primary">
              UPDATING : {props.RequestTitle}
            </button>
          </div>
        ) : null}

        <div className="chatHolder dashBoard">
          <div className="oUser msgCard">
            Hii <span className="timestampChat">22.34.21</span>
          </div>
          <div className="sUser msgCard">
            Hii <span className="timestampChat">22.34.21</span>
          </div>
          <div className="oUser msgCard">
            Hii <span className="timestampChat">22.34.21</span>
          </div>
          <div className="sUser msgCard">
            Hii <span className="timestampChat">22.34.21</span>
          </div>
          <div className="oUser msgCard">
            Hii <span className="timestampChat">22.34.21</span>
          </div>
          <div className="sUser msgCard">
            Hii <span className="timestampChat">22.34.21</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MiniDashboard;
