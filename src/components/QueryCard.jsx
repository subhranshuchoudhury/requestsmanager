import React, { useState, useEffect } from "react";
import "./querycard.css";
import { Animate } from "react-simple-animate";
import { FcFaq } from "react-icons/fc";
import { BiLike, BiDislike } from "react-icons/bi";
import Loader from "./Loader";

const QueryCard = (props) => {
  const [Requests, setRequests] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    const options = {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("x-access-token"),
      },
    };

    fetch("http://localhost:8080/api/requests", options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setRequests(response);
        setisLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setisLoading(false);
      });
  };
  return (
    <>
      {isLoading ? <Loader /> : null}

      <Animate play start={{ opacity: 0 }} end={{ opacity: 1 }}>
        <h1 className="pageTitle">All Requests</h1>
      </Animate>
      {Requests?.map((r, i) => {
        return (
          <Animate
            play
            start={{ opacity: 0 }}
            end={{ opacity: 1 }}
            duration={1}
          >
            <div
              style={{ width: "96%", textAlign: "center", margin: "auto" }}
              className="title-qr"
            >
              {r.username}
            </div>

            {r.requests.map((pr, i) => {
              return (
                <>
                  <div className="querycard">
                    <div className="title-qr">{pr.title}</div>
                    <br />
                    <p>
                      <button
                        class="btn btn-primary"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseWidthExample"
                        aria-expanded="false"
                        aria-controls="collapseWidthExample"
                      >
                        Request Status
                      </button>
                    </p>
                    <div>
                      <div
                        class="collapse collapse-horizontal"
                        id="collapseWidthExample"
                      >
                        <div class="card card-body" style={{ width: "100%" }}>
                          <div className="progressView"></div>
                          {pr.request_progress.map((rp, i) => {
                            return (
                              <>
                                <div className="orderP">
                                  {rp.icon} <span>{rp.title}</span>
                                </div>
                                <span className="orderP-date">
                                  {rp.timestamp}
                                </span>
                              </>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="up-down-btn">
                      <BiLike className="ex-btn" />
                      <BiDislike className="ex-btn" />
                      <FcFaq
                        className="ex-btn"
                        onClick={() => props.chatMessage(Math.random())}
                      />
                    </div>
                    <div
                      class="progress"
                      role="progressbar"
                      aria-label="Example with label"
                      aria-valuenow="10"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <div class="progress-bar" style={{ width: "10%" }}>
                        10%
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </Animate>
        );
      })}
    </>
  );
};

export default QueryCard;
