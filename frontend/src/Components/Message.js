import React from "react";
import "../Styles/Message.css";

const Message = ({ text, movement, author, notice, time }) => {
  return (
    <>
      {author ? (
        <div className={`text_space ${movement}`}>
          <div className="recived_msg">
            {" "}
            <span className="msg_user_name">{author}</span> - {text}
          </div>
          <div className="msg_user_time">{time}</div>
        </div>
      ) : !notice ? (
        <div className={`text_space ${movement}`}>
          <div className="recived_msg">{text}</div>
          <div
            className="msg_user_time"
            style={{ marginRight: "auto", marginLeft: 0 }}
          >
            {time}
          </div>
        </div>
      ) : null}

      {notice ? <div className="notice_box">{notice}</div> : null}
    </>
  );
};

export default Message;
