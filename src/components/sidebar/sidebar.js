import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./sidebar.scss";
import jwt from "jwt-decode";
import { listidState } from "../../Listidstate";
import { notification } from "antd";

export default function Sidebar() {
  const token = localStorage.getItem("authtoken");
  const decoded_token = jwt(token);
  const [lists, setLists] = useState([]);
  const [state, setState] = useState({});
  const [listidstate, setListidstate] = useContext(listidState);

  const openNotificationCreated = () => {
    notification.open({
      message: " 🎉 Successfully created new list.",
      className: "custom-class",
      placement: "bottomRight",
      bottom: 50,

      style: {
        width: 300,
      },
    });
  };

  useEffect(() => {
    axios
      .patch(
        `https://notespacebulgaria.herokuapp.com/api/update_title/${listidstate.listID}`,

        { title: listidstate.title, emoji: listidstate.emoji },

        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        setState((Math.random() + 1).toString(36).substring(7));
      })
      .catch((error) => {
        console.log("error " + error);
      });
  }, [listidstate]);

  useEffect(() => {
    axios
      .get(
        `https://notespacebulgaria.herokuapp.com/api/lists/${decoded_token._id}`,

        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        setLists(res.data);
      })
      .catch((error) => {
        console.log("error " + error);
      });
  }, [state, listidstate]);

  const addList = () => {
    axios
      .post(
        "https://notespacebulgaria.herokuapp.com/api/newlist",
        {
          emoji: "💡",
          title: "New list",
          ownerID: decoded_token._id,
        },
        {
          headers: { Authorization: token },
        }
      )
      .then((res) => {
        setState((Math.random() + 1).toString(36).substring(7));
        openNotificationCreated();
      })
      .catch((error) => {
        console.log("error " + error);
      });
  };

  return (
    <div className="Sidebar">
      <div className="Headr">
        <img
          alt="img"
          src="https://img.icons8.com/pastel-glyph/20/ffffff/ingredients-list--v2.png"
        />
        <b> My Lists </b>
      </div>

      <div className="lists">
        {lists.map((list) => {
          return (
            <p
              key={list._id}
              onClick={() => {
                setListidstate({
                  listID: list._id,
                  title: list.title,
                  emoji: list.emoji,
                });
              }}
            >
              {list.emoji} {list.title}{" "}
              <img
                alt="img"
                src="https://img.icons8.com/external-those-icons-lineal-those-icons/15/ffffff/external-right-arrows-those-icons-lineal-those-icons-1.png"
              />{" "}
            </p>
          );
        })}
      </div>

      <button className="add-button" onClick={addList}>
        {" "}
        <img
          alt="img"
          src="https://img.icons8.com/ios-filled/20/26e07f/plus-math.png"
        />
        <b> Add List</b>
      </button>
    </div>
  );
}
