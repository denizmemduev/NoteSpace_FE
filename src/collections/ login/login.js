import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../loading/loading";
import "./login.scss";
import axios from "axios";

export default function Login() {
  const [psw, setPsw] = useState({
    type: "password",
    link: "https://img.icons8.com/ios-glyphs/20/000000/invisible.png",
  });

  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorstate, setErrorstate] = useState("");

  const Login = (event) => {
    setLoading(true);
    localStorage.clear();

    axios
      .post("https://notespacebulgaria.herokuapp.com/api/user/login", {
        email: profile.email,
        password: profile.password,
      })
      .then((res) => {
        localStorage.setItem("authtoken", res.data);
        window.location.reload();
      })
      .catch((err) => {
        setLoading(false);
        setErrorstate(err.response.data);
      });
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  function showPass() {
    if (psw.type === "password") {
      setPsw({
        type: "text",
        link: "https://img.icons8.com/ios-glyphs/20/000000/visible.png",
      });
    }

    if (psw.type === "text") {
      setPsw({
        type: "password",
        link: "https://img.icons8.com/ios-glyphs/20/000000/invisible.png",
      });
    }
  }

  if (loading === true) {
    return (
      <div className="ldng">
        <Loading />
      </div>
    );
  }
  return (
    <form className="login" onSubmit={Login}>
      <h1> Login to NoteSpace </h1>
      <div id="email">
        <input
          autoFocus={true}
          name="email"
          required
          spellCheck="false"
          type="email"
          placeholder="Email address"
          onChange={handleChange}
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
        />
      </div>

      <div className="show-pass">
        <input
          name="password"
          required
          spellCheck="false"
          id="password"
          type={psw.type}
          placeholder="Password"
          onChange={handleChange}
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
        />
        <mat-icon id="visibility-icon">
          <img onClick={showPass} src={psw.link} />
        </mat-icon>
      </div>
      <a id="a">Forgot password?</a>

      <input type="submit" className="loginButton" value="Login" />
      <p>
        New to NoteSpace?{" "}
        <Link id="a2" to="/register">
          Create new account
        </Link>
      </p>
      <p id="errormessage"> {errorstate} </p>
    </form>
  );
}
