import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const NewRequest = () => {
  const [inputs, setInputs] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const loginAction = async () => {
    if (inputs.title === "" || inputs.title === "Request has been sent!") {
      alert(
        "This request is not acceptable!\n1. Clear the textarea and type.\n2. Cannot be empty."
      );
      inputs.title = "";
      return;
    }
    setIsLoading(true);
    const options = {
      method: "POST",
      headers: {
        "x-access-token": localStorage.getItem("x-access-token"),
      },
      body: new URLSearchParams({ title: inputs.title }),
    };

    fetch("http://localhost:8080/api/user/request", options)
      .then((response) => response.json())
      .then((response) => {
        setIsLoading(false);
        if (response.message === "request saved") {
          console.log("request saved");
          navigate("/queries");
          inputs.title = "Request has been sent!";
        } else if (response.message === "request not saved") {
          console.log("request not saved");
        } else if (response.message === "Unauthorized") {
          localStorage.clear();
          navigate("/login");
        }
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  };
  return (
    <div className="loginFormHolder">
      <form>
        <div class="mb-4">
          <label htmlFor="exampleInputTitle" className="form-label">
            Enter your request
          </label>
          <textarea
            type="text"
            name="title"
            value={inputs.title || ""}
            onChange={handleChange}
            class="form-control"
          ></textarea>
        </div>
      </form>
      {isLoading ? <Loader /> : null}
      <button onClick={loginAction} type="btn" class="btn btn-primary">
        Create request
      </button>
    </div>
  );
};

export default NewRequest;
