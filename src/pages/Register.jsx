import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Register = () => {
  // const [Details, setDetails] = useState("");
  const [inputs, setInputs] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const userType = ["user"];
  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    // console.log(inputs);
  };

  const handleCheckedChange = (event) => {
    if (event.target.checked) {
      userType.push("moderator");
    } else {
      userType.pop("moderator");
    }
    // console.log(userType);
  };

  const loginAction = async () => {
    setIsLoading(true);
    const options = {
      method: "POST",
      body: new URLSearchParams({
        username: inputs.username,
        email: inputs.email,
        password: inputs.password,
        "roles[0]": userType[0],
        "roles[1]": userType[1] === undefined ? "user" : userType[1],
      }),
    };

    await fetch("http://localhost:8080/api/auth/signup", options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setIsLoading(false);
        navigate("/login");
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
          <label htmlFor="exampleInputEmail" className="form-label">
            Email
          </label>
          <input
            type="text"
            name="email"
            value={inputs.email || ""}
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

        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckCheckedDisabled"
            checked
            disabled
          ></input>
          <label class="form-check-label" for="flexCheckCheckedDisabled">
            Normal User
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value="moderator"
            id="flexCheckDefault"
            onChange={(e) => handleCheckedChange(e)}
          ></input>
          <label class="form-check-label" htmlFor="flexCheckDefault">
            Moderator
          </label>
        </div>
        <br />
      </form>

      {isLoading ? <Loader /> : null}
      <button onClick={loginAction} type="btn" class="btn btn-primary">
        Register
      </button>
    </div>
  );
};

export default Register;
