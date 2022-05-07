import axios from "axios";
import React, { useState } from "react";

import { Link } from "react-router-dom";
import Loading from "../loading/loading";
import "./register.scss";

export default function Register() {
  const [errorstate, setErrorstate] = useState("");
  const [loading, setLoading] = useState(false);
  const [psw, setPsw] = useState({
    type: "password",
    link: "https://img.icons8.com/ios-glyphs/20/000000/invisible.png",
  });

  const [profile, setProfile] = useState({});

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

  const submitHandler = (event) => {
    event.preventDefault();
    setLoading(true);

    if (profile.password === profile.cpassword) {
      axios
        .post("https://notespacebulgaria.herokuapp.com/api/user/register", {
          username: profile.username,
          email: profile.email,
          password: profile.password,
        })
        .then((res) => {
          setLoading(false);

          setErrorstate("");
          alert(" Created user ");
          setProfile({ username: "", email: "", password: "", cpassword: "" });
          // setProfile({});
        })
        .catch((err) => {
          console.log("error " + err);
          setLoading(false);
          setErrorstate(err.response.data);
        });
    } else {
      alert("Password not confirmed");
      setLoading(false);
    }
  };

  if (loading === true) {
    return (
      <div className="ldng">
        <Loading />
      </div>
    );
  }

  return (
    <form className="login" onSubmit={submitHandler}>
      <h1> Join to NoteSpace </h1>
      <div className="inputfiled">
        <input
          name="username"
          required
          spellCheck="false"
          type="text"
          placeholder="Username"
          onChange={handleChange}
          pattern="[a-z0-9]+"
          minLength={6}
          value={profile.username}
        />
      </div>

      <div className="inputfiled">
        <input
          name="email"
          required
          spellCheck="false"
          type="email"
          placeholder="Email address"
          onChange={handleChange}
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          value={profile.email}
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
          minLength={6}
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
          value={profile.password}
        />
        <mat-icon id="visibility-icon">
          <img onClick={showPass} src={psw.link} />
        </mat-icon>
      </div>

      <div className="show-pass">
        <input
          name="cpassword"
          required
          spellCheck="false"
          id="cpassword"
          type={psw.type}
          placeholder="Confirm password"
          onChange={handleChange}
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
          value={profile.cpassword}
        />
      </div>

      <input type="submit" className="loginButton" value="Register" />
      <p>
        Already have an account?
        <Link id="a2" to="/">
          Login
        </Link>
      </p>

      <p id="errormessage"> {errorstate} </p>
    </form>
  );
}
