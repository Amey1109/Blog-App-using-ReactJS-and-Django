import React, { useState } from "react";
import SecureAxios from "../config/SecureAxios";
import { Link } from "react-router-dom";
export default function LoginTest(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);
  const [status, setStatus] = useState({});

  localStorage.setItem("accessToken", status.access);
  localStorage.setItem("loggedIn", status.loggedIn);
  localStorage.setItem("id", status.id);
  localStorage.setItem("status",status.msg)

  const handleClick = () => {
    SecureAxios({
      method: "POST",
      url: "userApi/token/",
      data: { username: username, password: password },
    })
      .then((res) => setToken(res.data.access))
      .catch((e) => console.log(e));

    SecureAxios({
      method: "POST",
      url: "userApi/login/",
      data: { username: username, password: password },
    })
      .then((res) => setStatus(res.data))
      .catch((res) => console.log(res.data));

    
  };
  return (
    <div>
      <div className="text-center login-body">
        <div className="form-signin">
          <h1 className="h3 mb-3 fw-normal">Log in</h1>
          <label for="inputEmail" className="visually-hidden">
            Username
          </label>
          <input
            type="text"
            id="inputEmail"
            className="form-control mb-3"
            placeholder="Username"
            required
            autofocus
            onChange={(event) => setUsername(event.target.value)}
          />
          <label for="inputPassword" className="visually-hidden">
            Password
          </label>
          <input
            type="password"
            id="inputPassword"
            className="form-control mb-3"
            placeholder="Password"
            required
            onChange={(event) => setPassword(event.target.value)}
          />

          {status.msg ? (
            <Link to="/MyBlogs">
              <button
                type="submit"
                className="btn btn-outline-primary btn-lg"
                onClick={() => {
                  handleClick();
                }}
              >
                Log in
              </button>
            </Link>
          ) : (
            <button
              type="submit"
              className="btn btn-outline-primary btn-lg"
              onClick={() => {
                handleClick();
              }}
            >
              Log in
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
