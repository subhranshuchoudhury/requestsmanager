import React from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

const MiniDashboard = (props) => {
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
          Queries are resolved.
        </div>
        <div>Message: {props.message}</div>
      </div>
    </>
  );
};

export default MiniDashboard;
