import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

import "./login.css";
const Login = () => {
  // const [Details, setDetails] = useState("");
  const [inputs, setInputs] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    console.log(inputs);
  };

  const loginAction = async () => {
    setIsLoading(true);
    const options = {
      method: "POST",
      body: new URLSearchParams({
        username: inputs.username,
        password: inputs.password,
      }),
    };

    await fetch(
      "https://request-manager-backend.onrender.com/api/auth/signin",
      options
    )
      .then((response) => {
        if (response.status >= 400) {
          setIsLoading(false);
          alert("Wrong Credentials");
        }
        return response.json();
      })
      .then((response) => {
        if (response?.accessToken) {
          localStorage.setItem("x-access-token", response.accessToken);
          localStorage.setItem("username", response.username);
          localStorage.setItem(
            "ROLES",
            `${response.roles[0]}${
              response.roles[1] === undefined ? "" : response.roles[1]
            }`
          );
          // setDetails(response);
          setIsLoading(false);
          console.log("Login Successful");
          navigate("/queries");
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
          <label htmlFor="exampleInputUsername" className="form-label">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={inputs.username || ""}
            onChange={handleChange}
            class="form-control"
          ></input>
        </div>
        <div class="mb-4">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={inputs.password || ""}
            onChange={handleChange}
            class="form-control"
          ></input>
        </div>
      </form>
      {isLoading ? <Loader /> : null}
      <button onClick={loginAction} type="btn" class="btn btn-primary">
        Login
      </button>
    </div>
  );
};

export default Login;
