import React, { useState, useEffect, useContext } from "react";
import "./main.scss";
import { listidState } from "../../Listidstate";
import axios from "axios";
import TextareaAutosize from "react-textarea-autosize";
import { notification, Modal, Empty } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import jwt from "jwt-decode";
import { Skeleton } from "antd";
import { Spin } from "antd";
import { EmojiButton } from "@joeattardi/emoji-button";

export default function Main() {
  const token = localStorage.getItem("authtoken");
  const [content, setContent] = useContext(listidState);
  const [localstate, setLocalstate] = useState({});
  const [items, setItems] = useState([]);
  const [edit, setEdit] = useState("disabled");
  const [state, setState] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingnew, setLoadingnew] = useState(false);
  const { confirm } = Modal;

  function showDeleteConfirm(itemID) {
    confirm({
      title: "Are you sure delete this item ?",
      icon: <ExclamationCircleOutlined />,
      content: "This will delete it forever",
      okText: "Delete",
      okType: "secondary",
      cancelText: "Cancel",
      onOk() {
        deleteListItem(itemID);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }

  function showDeleteConfirmLists(itemID) {
    confirm({
      title: "Are you sure delete this list ?",
      icon: <ExclamationCircleOutlined />,
      content: "This will delete the list and  all the items inside forever",
      okText: "Delete",
      okType: "secondary",
      cancelText: "Cancel",
      onOk() {
        deleteList(content.listID);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }

  const picker = new EmojiButton({
    theme: "dark",
    styleProperties: {
      "--category-button-active-color": "#3cb371",
    },
    position: "bottom-start",
  });

  const openNotificationSuccess = () => {
    notification.open({
      message: " 🎉 Successfully updated item.",
      className: "custom-class",
      placement: "bottomRight",
      bottom: 50,

      style: {
        width: 340,
      },
    });
  };
  console.log(items);
  const openNotificationDeleted = () => {
    notification.open({
      message: " ❌ Successfully deleted item.",

      className: "custom-class",
      placement: "bottomRight",
      bottom: 50,

      style: {
        width: 300,
      },
    });
  };

  const openNotificationEmpty = () => {
    notification.open({
      message: " ❌ Unexpected data",
      description: "This filed can not be empty.",
      className: "custom-class",
      placement: "bottomRight",
      bottom: 50,

      style: {
        width: 300,
      },
    });
  };

  const openNotificationCreated = () => {
    notification.open({
      message: " 🎉 Successfully created new item.",
      className: "custom-class",
      placement: "bottomRight",
      bottom: 50,

      style: {
        width: 340,
      },
    });
  };

  const deleteList = () => {
    axios
      .delete(
        `https://notespacebulgaria.herokuapp.com/api/delete_list/${content.listID}`,

        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        setContent([]);
        openNotificationDeleted();
      })
      .catch((error) => {
        console.log("error " + error);
      });
  };

  useEffect(() => {
    setLoading(true);
    setLocalstate(content);
    axios
      .get(
        `https://notespacebulgaria.herokuapp.com/api/items/${content.listID}`,

        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        setItems(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error " + error);
      });
  }, [content, state]);

  const addListItem = (listID) => {
    setLoadingnew(true);
    axios
      .post(
        "https://notespacebulgaria.herokuapp.com/api/additem",
        {
          text: " 📌 new item",
          listID: listID,
        },
        {
          headers: { Authorization: token },
        }
      )
      .then((res) => {
        setState((Math.random() + 1).toString(36).substring(7));
        openNotificationCreated();
        setLoadingnew(false);
      })
      .catch((error) => {
        console.log("error " + error);
      });
  };

  const deleteListItem = (itemID) => {
    axios
      .delete(
        "https://notespacebulgaria.herokuapp.com/api/delete_item/" + itemID,

        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        setState((Math.random() + 1).toString(36).substring(7));
        openNotificationDeleted();
      })
      .catch((error) => {
        console.log("error " + error);
      });
  };

  const updateItem = (itemID) => {
    axios
      .patch(
        "https://notespacebulgaria.herokuapp.com/api/update_item/" + itemID,

        { text: document.getElementById("item" + itemID).value },

        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        document.getElementById(itemID).classList.remove("not-saved");
        openNotificationSuccess();
      })
      .catch((error) => {
        console.log("error " + error);
      });
  };

  picker.on("emoji", (selection) => {
    setContent({
      ...content,
      emoji: selection.emoji,
    });
  });

  if (Object.keys(content).length > 0) {
    return (
      <div className="Main">
        <div className="main-content">
          <div className="control-panel">
            <button
              onClick={(e) => picker.togglePicker(e.target)}
              className={`trigger `}
            >
              {content.emoji}
            </button>
            <form
              onSubmit={(e) => {
                setEdit("disabled");
                e.preventDefault();
                setContent(localstate);
                openNotificationSuccess();
              }}
            >
              <input
                spellCheck="false"
                required
                value={localstate.title || ""}
                type="text"
                onChange={(e) => {
                  setLocalstate({
                    emoji: content.emoji,
                    listID: content.listID,
                    title: e.target.value,
                  });
                  setEdit("");
                }}
              />
            </form>

            <div className="edit-panel">
              <button
                className="buttons"
                id="savebutton"
                disabled={edit ? "disabled" : null}
                onClick={() => {
                  if (localstate.title !== "" && localstate.listID !== "") {
                    setContent(localstate);
                    setEdit("disabled");
                    openNotificationSuccess();
                  } else openNotificationEmpty();
                }}
              >
                <img
                  alt="img"
                  className={edit}
                  src="https://img.icons8.com/ios-glyphs/22/ffffff/save--v1.png"
                />
              </button>
              <button className="buttons">
                {" "}
                <img
                  alt="img"
                  onClick={() => {
                    showDeleteConfirmLists(content.listID);
                  }}
                  src="https://img.icons8.com/ios-glyphs/22/ffffff/filled-trash.png"
                />{" "}
              </button>
            </div>
          </div>

          <div className="tools">
            <button
              onClick={() => {
                addListItem(content.listID);
              }}
              className="newListItem"
            >
              {loadingnew ? (
                <Spin />
              ) : (
                <img
                  alt="img"
                  src="https://img.icons8.com/external-becris-lineal-becris/24/ffffff/external-add-mintab-for-ios-becris-lineal-becris-2.png"
                />
              )}
            </button>
          </div>

          {!loading ? (
            items.length > 0 ? (
              items.map((item) => {
                return (
                  <div key={item._id} className="listItem">
                    <TextareaAutosize
                      id={"item" + item._id}
                      className="textarea"
                      defaultValue={item.text}
                      spellCheck="false"
                      maxLength={255}
                      onChange={() => {
                        document
                          .getElementById(item._id)
                          .classList.add("not-saved");
                      }}
                    />
                    <div className="item-e">
                      <img
                        alt="img"
                        className="delete"
                        onClick={() => {
                          //
                          showDeleteConfirm(item._id);
                        }}
                        src="https://img.icons8.com/ios/15/ffffff/delete-sign--v1.png"
                      />

                      <img
                        alt="save"
                        className="save"
                        id={item._id}
                        src="https://img.icons8.com/ios-glyphs/15/ffffff/save--v1.png"
                        onClick={() => {
                          updateItem(item._id);
                        }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="empty">
                <img src="https://img.icons8.com/dotty/120/ffffff/search-database.png" />
                <p>Your collection list is empty</p>
              </div>
            )
          ) : (
            <div className="main-content2">
              <Skeleton active />
              <Skeleton active />
              <Skeleton active />
              <Skeleton active />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="Main">
      <div className="content2">
        <div className="content2__container">
          <p className="content2__container__text">Hello</p>

          <ul className="content2__container__list">
            <li className="content2__container__list__item">world 👋 </li>
            <li className="content2__container__list__item">
              {jwt(token).username} 👋
            </li>
            <li className="content2__container__list__item">users 👋 </li>
            <li className="content2__container__list__item">everybody 👋 </li>
          </ul>
        </div>
        <p className="msg">nice to see you again </p>
      </div>
    </div>
  );
}
