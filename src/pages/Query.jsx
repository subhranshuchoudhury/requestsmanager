import React, { useState } from "react";
import MiniDashboard from "../components/MiniDashboard";
import QueryCard from "../components/QueryCard";
import "./query.css";
const Query = (props) => {
  const [RequestID, setRequestID] = useState("");
  const [RequestTitle, setRequestTitle] = useState("");
  const updateRequest = (RequestID, RequestTitle) => {
    // alert("RequestID " + RequestID);
    setRequestID(RequestID);
    setRequestTitle(RequestTitle);
  };
  return (
    <>
      <div className="QueryContainer">
        <QueryCard updateRequest={updateRequest} />
      </div>

      <div className="QueryContainer2">
        <MiniDashboard RequestID={RequestID} RequestTitle={RequestTitle} />
      </div>
    </>
  );
};

export default Query;
