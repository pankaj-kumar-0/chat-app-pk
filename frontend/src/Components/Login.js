import React, { useState } from "react";
import "../Styles/Login.css";
import logo from "../Assets/logo.png";
import { Link } from "react-router-dom";

const Login = (props) => {
  let [name, setname] = useState("");
  const [error, seterror] = useState(false);

  const callname = () => {
    name = name.trim();

    if (!name) {
      seterror(true);
    }
    if (name) {
      props.setget_name(name);
    }
  };

  return (
    <>
      <div className="login_box">
        <div className="heading">
          <img src={logo} alt="logo" />
          <h1>Chat App</h1>
        </div>
        <div className="form">
          <h1>Login</h1>

          <input
            className="input"
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setname(e.target.value)}
            value={name}
            maxLength="25"
          />
          {error && !name.trim() ? (
            <div className="login_err">Please enter the name</div>
          ) : null}

          <Link to={name.trim() ? "/chat_container" : "/"}>
            <button
              className="input enter_btn"
              type="button"
              onClick={callname}
            >
              Enter in Chat
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
