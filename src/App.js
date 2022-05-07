import React from "react";
import "./App.scss";
import Login from "./collections/ login/login";
import Register from "./collections/register/register";
import Navbar from "./components/navbar/navbar";
import Sidebar from "./components/sidebar/sidebar";
import Main from "./components/Main_content/main";
import jwt from "jwt-decode";
import { Listidstate } from "./Listidstate";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const token = localStorage.getItem("authtoken");
function App() {
  if (token && jwt(token).exp * 1000 > Date.now()) {
    return (
      <div>
        <div className="App">
          <Listidstate>
            <div className="content">
              <Sidebar />
              <div className="rightside">
                <Navbar />
                <Main />
              </div>
            </div>
          </Listidstate>

          <p id="lbl">Created by: Deniz Memduev</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <svg
        width="100%"
        height="100%"
        id="svg"
        viewBox="0 0 1440 600"
        xmlns="http://www.w3.org/2000/svg"
        className="transition duration-300 ease-in-out delay-150"
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="5%" stopColor="#30b37688"></stop>
            <stop offset="95%" stopColor="#30b37688"></stop>
          </linearGradient>
        </defs>
        <path
          d="M 0,600 C 0,600 0,200 0,200 C 232,177 464,154 704,154 C 944,154 1192,177 1440,200 C 1440,200 1440,600 1440,600 Z"
          stroke="none"
          strokeWidth="0"
          fill="url(#gradient)"
          className="transition-all duration-300 ease-in-out delay-150 path-0"
          transform="rotate(-180 720 300)"
        ></path>

        <defs>
          <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="5%" stopColor="#30b376ff"></stop>
            <stop offset="95%" stopColor="#30b376ff"></stop>
          </linearGradient>
        </defs>
        <path
          d="M 0,600 C 0,600 0,400 0,400 C 176.5,434 353,468 593,468 C 833,468 1136.5,434 1440,400 C 1440,400 1440,600 1440,600 Z"
          stroke="none"
          strokeWidth="0"
          fill="url(#gradient)"
          className="transition-all duration-300 ease-in-out delay-150 path-1"
          transform="rotate(-180 720 300)"
        ></path>
      </svg>

      <h1> NoteSpace </h1>
      <p id="decription">
        {" "}
        <i>helps you to organize and manage your day.</i>{" "}
      </p>

      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>

      {/* <Login /> */}
      <p id="lbl">Created by: Deniz Memduev</p>
    </div>
  );
}

export default App;
