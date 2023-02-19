import { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    // verify the x-access-token if it is valid.
    // otherwise route to /login
    if (!isChecked && localStorage.getItem("x-access-token")) {
      const options = {
        method: "GET",
        headers: {
          "x-access-token": localStorage.getItem("x-access-token"),
        },
      };

      fetch("http://localhost:8080/api/verify", options)
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          if (response.message === "verified") {
            setIsChecked(true);
          } else {
            localStorage.clear();
            navigate("/login");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      if (!localStorage.getItem("x-access-token")) {
        navigate("/login");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Outlet />

      <nav className="navbar fixed-bottom bg-body-tertiary">
        <div className="container-fluid">
          <center>
            <div className="nav-btn-kapu">
              <button onClick={() => navigate("/")} className="btn btn-primary">
                Home
              </button>
              <button
                onClick={() => navigate("/login")}
                className="btn btn-primary"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="btn btn-primary"
              >
                Register
              </button>
              <button
                onClick={() => navigate("/queries")}
                className="btn btn-primary"
              >
                Queries
              </button>
              <button
                onClick={() => navigate("/logout")}
                className="btn btn-primary"
              >
                Logout
              </button>
            </div>
          </center>
        </div>
      </nav>
    </>
  );
};

export default Layout;
