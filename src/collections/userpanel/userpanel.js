import React from "react";
import "./userpanel.scss";
import jwt from "jwt-decode";

export default function Userpanel() {
  const token = localStorage.getItem("authtoken");
  return (
    <div id="userpanel" className="Userpanels closed">
      <img
        src="https://img.icons8.com/ios-filled/25/ffffff/sort-up.png"
        alt="img"
      />
      <div className="panel-content">
        <div className="user-info">
          <img
            src="https://img.icons8.com/external-bearicons-glyph-bearicons/35/000000/external-User-essential-collection-bearicons-glyph-bearicons.png"
            alt="img"
          />
          <h4>{jwt(token).username}</h4>
        </div>
        <div className="menu">
          <ul>
            <li>
              <img
                src="https://img.icons8.com/material-sharp/24/000000/settings.png"
                alt="img"
              />
              <b> Account settings </b>
            </li>
            <li>
              <img
                src="https://img.icons8.com/ios-glyphs/24/000000/help.png"
                alt="img"
              />
              <b> Help </b>
            </li>
          </ul>
        </div>
        <button
          className="logout-button"
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
        >
          <img
            src="https://img.icons8.com/ios-glyphs/24/ffffff/exit.png"
            alt="img"
          />
          Logout
        </button>
      </div>
    </div>
  );
}
