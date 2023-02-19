import React, { useState } from "react";
import MiniDashboard from "../components/MiniDashboard";
import QueryCard from "../components/QueryCard";
import "./query.css";
const Query = (props) => {
  const [Message, setMessage] = useState("");
  const chatMessage = (message) => {
    // alert("Message " + message);
    setMessage(message);
  };
  return (
    <>
      <div className="QueryContainer">
        <QueryCard chatMessage={chatMessage} />
      </div>

      <div className="QueryContainer2">
        <MiniDashboard message={Message} />
      </div>
    </>
  );
};

export default Query;
