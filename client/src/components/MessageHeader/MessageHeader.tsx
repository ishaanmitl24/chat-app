import React from "react";
import classes from "../MessageHeader/MessageHeader.module.css";
import { Icon } from "@iconify/react";
import { friend } from "../../models/user";

const MessageHeader: React.FC<{ friend: friend }> = (props) => {
  const { friend } = props;

  const getAvaatarIconText = (name: string) => {
    const nameArr: string[] = name.split(" ");
    let newName: string = "";
    for (let i = 0; i < nameArr.length; i++) {
      newName += nameArr[i][0];
    }
    return newName;
  };
  return (
    <div className={classes.main}>
      <div className={classes.userInfo}>
        <div className={classes.profile}>
          {getAvaatarIconText(friend?.name)}
        </div>
        <div className={classes.name}>{friend?.name}</div>
      </div>

      <button className={classes.close_chat}>
        <Icon
          style={{ width: "25px", height: "25px", alignSelf: "center" }}
          icon="bi:three-dots-vertical"
        />
      </button>
    </div>
  );
};

export default MessageHeader;
