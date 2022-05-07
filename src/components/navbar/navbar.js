import React from "react";
import "./navbar.scss";
import Userpanel from "../../collections/userpanel/userpanel";
import { Offline, Online } from "react-detect-offline";

export default function Navbar() {
  return (
    <div className="Navbar">
      <div className="title"> NoteSpace</div>

      <div className="menu">
        <Online>
          <div className="network-status">
            {" "}
            <div id="green-circle"></div>Connected
          </div>
        </Online>

        <Offline>
          <div className="network-status">
            <div id="orange-circle"></div>Connecting...
          </div>
        </Offline>
        <div
          onClick={() => {
            document.getElementById("userpanel").classList.toggle("closed");
          }}
        >
          <img
            id="img1"
            src="https://img.icons8.com/ios-glyphs/23/ffffff/user--v1.png"
            alt="img"
          />
        </div>
      </div>
      <Userpanel />
    </div>
  );
}
