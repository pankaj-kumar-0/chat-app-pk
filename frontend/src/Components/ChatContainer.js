import React, { useEffect, useState } from "react";
import "../Styles/ChatContainer.css";
import logo from "../Assets/logo.png";
import { useNavigate } from "react-router-dom";
import Message from "./Message";

import ScrollToBottom from "react-scroll-to-bottom";
import io from "socket.io-client";

let socket;

const ChatContainer = ({ user_name }) => {
  const navigate = useNavigate();
  const [text, settext] = useState("");
  const [user_id, setuser_id] = useState("");
  const [msg_list, setmsg_list] = useState([]);

  useEffect(() => {
    if (!user_name) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (user_name) {
      socket = io.connect("https://chat-app-pk.herokuapp.com/");

      socket.on("connect", () => {
        setuser_id(socket.id);
        // console.log(`${socket.id} has joined`)
      });

      socket.emit("user_join", { name: user_name });
      socket.on("welcome_msg", (data) => {
        // console.log(data.msg);
        setmsg_list((list) => [...list, data]);
      });

      socket.on("another_user_join", (data) => {
        // console.log( data.msg );
        setmsg_list((list) => [...list, data]);
      });

      socket.on("user_leave", (data) => {
        // console.log(data.msg );
        setmsg_list((list) => [...list, data]);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [user_name]);

  const send_message = () => {
    if (user_name && text.trim()) {
      const msg = {
        user_id: user_id,
        send_msg: text,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      socket.emit("sending_text", msg);
      settext("");
    }
  };

  useEffect(() => {
    if (user_name) {
      socket.on("sending_text_responce", (data) => {
        setmsg_list((list) => [...list, data]);
        //  console.log(data);
      });
    }
  }, [user_name]);

  return (
    <>
      <div className="chat_container">
        <div className="top">
          <img src={logo} alt="logo" />
          <h1>Chat App</h1>
        </div>
        <div className="dividing_line1"></div>

        <ScrollToBottom className="chat_section">
          {/* <h1>{user_name}</h1>         */}
          {msg_list.map((item) => {
            return (
              <Message
                text={item.send_msg}
                movement={item.user_id === user_id ? "right" : "left"}
                author={item.user_id === user_id ? "" : item.name}
                time={item.time}
                notice={item.msg}
              />
            );
          })}
        </ScrollToBottom>

        <div className="dividing_line2"></div>
        <div className="chat_input_box">
          <input
            className="msg_input"
            type="text"
            placeholder="Enter the message"
            onChange={(e) => settext(e.target.value)}
            value={text}
            onKeyPress={ (e)=>e.key ==='Enter'? send_message():null }
          />

          <button className="send_msg_btn" onClick={send_message}>
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatContainer;
