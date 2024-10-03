import React from "react";
import classes from "../MessageHeader/MessageHeader.module.css";
import { Icon } from "@iconify/react";

const MessageHeader: React.FC<{}> = () => {
  return (
    <div className={classes.main}>
      <div>
        
      </div>
      <button className={classes.close_chat}>
        <Icon
          style={{ width: "25px", height: "25px" }}
          icon="bi:three-dots-vertical"
        />
      </button>
    </div>
  );
};

export default MessageHeader;
