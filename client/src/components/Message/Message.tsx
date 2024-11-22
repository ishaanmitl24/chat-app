import React from "react";
import classes from "../Message/Message.module.css";
import { messageData } from "../../models/user";
import { useAppSelector } from "../../store";
import { Box } from "@mui/material";

const Message: React.FC<{
  messageData: messageData[];
}> = (props) => {
  const { messageData } = props;
  console.log(messageData);
  const { userId } = useAppSelector((state) => state.auth);

  const getAvaatarIconText = (name: string) => {
    const nameArr: string[] = name.split(" ");
    let newName: string = "";
    for (let i = 0; i < nameArr.length; i++) {
      newName += nameArr[i][0];
    }
    return newName;
  };

  const convertToIST = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  return (
    <div className={classes.main}>
      {!messageData.length && (
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          No Message found!
        </Box>
      )}
      {messageData.length > 0 &&
        messageData.map((data: messageData) => {
          if (data.userId === userId) {
            return (
              <div className={classes.user_container}>
                <div className={classes.profile}>
                  {getAvaatarIconText(data.name)}
                </div>
                <div className={classes.message_container}>
                  <div className={classes.userMessage}>{data.message}</div>
                  <div
                    style={{
                      alignSelf: "flex-end",
                      textTransform: "uppercase",
                    }}
                    className={classes.time}
                  >
                    {convertToIST(data.createdAt)}
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <div className={classes.friend_container}>
                <div className={classes.profile}>
                  {getAvaatarIconText(data.name)}
                </div>
                <div className={classes.message_container}>
                  <div className={classes.friend_message}>{data.message}</div>
                  <div
                    style={{ textTransform: "uppercase" }}
                    className={classes.time}
                  >
                    {convertToIST(data.createdAt)}
                  </div>
                </div>
              </div>
            );
          }
        })}
    </div>
  );
};

export default Message;
