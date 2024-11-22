import classes from "../MessageFooter/MessageFooter.module.css";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
import { useAppSelector } from "../../store";
import { CircularProgress } from "@mui/material";
import { messageData } from "../../models/user";

const MessageFooter: React.FC<{
  messageConnectionId: string;
  setMessageData: React.Dispatch<React.SetStateAction<messageData[]>>;
}> = (props) => {
  const { messageConnectionId, setMessageData } = props;
  const { userId, token } = useAppSelector((state) => state.auth);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const sendMessage = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    if (message.trim().length === 0) {
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:4001/messages/send-message`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            messageConnectionId,
            message,
            userId,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (data?.ok) {
        toast.success("Message sent!");
        setMessageData((prev) => {
          return [...prev, data?.data];
        });
        setMessage("");
      }
    } catch (err) {
      toast.error("An error occurred!");
    }
    setLoading(false);
  };
  return (
    <div className={classes.main}>
      <form onSubmit={sendMessage} className={classes.form}>
        <input
          onChange={(event) => {
            setMessage(event.target.value);
          }}
          placeholder="Type a Message..."
          type="text"
          name="message"
          value={message}
        />
        <button type="submit" className={classes.sendButton}>
          {loading && <CircularProgress />}
          {!loading && (
            <Icon
              style={{
                width: "25px",
                height: "25px",
                alignSelf: "center",
                color: "#5775e1",
              }}
              icon="fa-send"
            />
          )}
        </button>
      </form>
    </div>
  );
};

export default MessageFooter;
